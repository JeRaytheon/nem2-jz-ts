import { RawArray as array } from '../format';
import * as nacl from './nacl_catapult';
import { SHA3Hasher as sha3Hasher } from './SHA3Hasher';
import { SignSchema } from './SignSchema';
// tslint:disable-next-line: no-var-requires
export const CryptoJS = require('crypto-js');
// tslint:disable-next-line: variable-name
export const Key_Size = 32;
// tslint:disable-next-line: variable-name
export const Signature_Size = 64;
// tslint:disable-next-line: variable-name
export const Half_Signature_Size = Signature_Size / 2;
// tslint:disable-next-line: variable-name
export const Hash_Size = 64;
// tslint:disable-next-line: variable-name
export const Half_Hash_Size = Hash_Size / 2;

/**
 * Convert an Uint8Array to WordArray
 *
 * @param {Uint8Array} ua - An Uint8Array
 * @param {number} uaLength - The Uint8Array length
 *
 * @return {WordArray}
 */
export const ua2words = (ua: Uint8Array, uaLength: number) => {
    const temp: number[] = [];
    for (let i = 0; i < uaLength; i += 4) {
        const x = ua[i] * 0x1000000 + (ua[i + 1] || 0) * 0x10000 + (ua[i + 2] || 0) * 0x100 + (ua[i + 3] || 0);
        temp.push((x > 0x7fffffff) ? x - 0x100000000 : x);
    }
    return CryptoJS.lib.WordArray.create(temp, uaLength);
};

/**
 * Convert a wordArray to Uint8Array
 *
 * @param {Uint8Array} destUa - A destination Uint8Array
 * @param {WordArray} cryptoWords - A wordArray
 *
 * @return {Uint8Array}
 */
export const words2ua = (destUa: Uint8Array, cryptoWords: any) => {
    for (let i = 0; i < destUa.length; i += 4) {
        let v = cryptoWords.words[i / 4];
        if (v < 0) { v += 0x100000000; }
        destUa[i] = (v >>> 24);
        destUa[i + 1] = (v >>> 16) & 0xff;
        destUa[i + 2] = (v >>> 8) & 0xff;
        destUa[i + 3] = v & 0xff;
    }
    return destUa;
};

// tslint:disable-next-line: variable-name
export const catapult_hash = {
    func: sha3Hasher.func,
    createHasher: sha3Hasher.createHasher,
};

// custom catapult crypto functions
// tslint:disable-next-line: variable-name
export const catapult_crypto = (function () {
    function clamp(d: any) {
        d[0] &= 248;
        d[31] &= 127;
        d[31] |= 64;
    }

    function prepareForScalarMult(sk: any, hashfunc: any, signSchema: SignSchema) {
        const d = new Uint8Array(Hash_Size);
        hashfunc(d, sk, Hash_Size, signSchema);
        clamp(d);
        return d;
    }

    const encodedSChecker = (function () {
        // tslint:disable-next-line: variable-name
        const Is_Reduced = 1;
        // tslint:disable-next-line: variable-name
        const Is_Zero = 2;

        function validateEncodedSPart(s: any) {
            if (array.isZeroFilled(s)) {
                return Is_Zero | Is_Reduced;
            }
            const copy = new Uint8Array(Signature_Size);
            array.copy(copy, s, Half_Signature_Size);

            nacl.reduce(copy);
            return array.deepEqual(s, copy, Half_Signature_Size) ? Is_Reduced : 0;
        }

        return {
            isCanonical: (s: any) => Is_Reduced === validateEncodedSPart(s),

            requireValid: (s: any) => {
                if (0 === (validateEncodedSPart(s) & Is_Reduced)) {
                    throw Error('S part of signature invalid');
                }
            },
        };
    })();

    return {
        extractPublicKey: (sk: any, hashfunc: any, signSchema: SignSchema) => {
            const c = nacl;
            const d = prepareForScalarMult(sk, hashfunc, signSchema);

            const p = [c.gf(), c.gf(), c.gf(), c.gf()];
            const pk = new Uint8Array(Key_Size);
            c.scalarbase(p, d);
            c.pack(pk, p);
            return pk;
        },

        sign: (m: any, pk: any, sk: any, hasher: any) => {
            const c = nacl;

            const d = new Uint8Array(Hash_Size);
            hasher.reset();
            hasher.update(sk);
            hasher.finalize(d);
            clamp(d);

            const r = new Uint8Array(Hash_Size);
            hasher.reset();
            hasher.update(d.subarray(Half_Hash_Size));
            hasher.update(m);
            hasher.finalize(r);

            const p = [c.gf(), c.gf(), c.gf(), c.gf()];
            const signature = new Uint8Array(Signature_Size);
            c.reduce(r);
            c.scalarbase(p, r);
            c.pack(signature, p);

            const h = new Uint8Array(Hash_Size);
            hasher.reset();
            hasher.update(signature.subarray(0, Half_Signature_Size));
            hasher.update(pk);
            hasher.update(m);
            hasher.finalize(h);

            c.reduce(h);

            // muladd
            const x = new Float64Array(Hash_Size);
            array.copy(x, r, Half_Hash_Size);

            for (let i = 0; i < Half_Hash_Size; ++i) {
                for (let j = 0; j < Half_Hash_Size; ++j) {
                    x[i + j] += h[i] * d[j];
                }
            }

            c.modL(signature.subarray(Half_Signature_Size), x);
            encodedSChecker.requireValid(signature.subarray(Half_Signature_Size));
            return signature;
        },

        verify: (pk: any, m: any, signature: any, hasher: any) => {
            // reject non canonical signature
            if (!encodedSChecker.isCanonical(signature.subarray(Half_Signature_Size))) {
                return false;
            }

            // reject weak (zero) public key
            if (array.isZeroFilled(pk)) {
                return false;
            }

            const c = nacl;
            const p = [c.gf(), c.gf(), c.gf(), c.gf()];
            const q = [c.gf(), c.gf(), c.gf(), c.gf()];

            if (c.unpackneg(q, pk)) {
                return false;
            }

            const h = new Uint8Array(Hash_Size);
            hasher.reset();
            hasher.update(signature.subarray(0, Half_Signature_Size));
            hasher.update(pk);
            hasher.update(m);
            hasher.finalize(h);

            c.reduce(h);
            c.scalarmult(p, q, h);

            const t = new Uint8Array(Signature_Size);
            c.scalarbase(q, signature.subarray(Half_Signature_Size));
            c.add(p, q);
            c.pack(t, p);

            return 0 === c.crypto_verify_32(signature, 0, t, 0);
        },

        deriveSharedKey: (salt: any, sk: any, pk: any, hashfunc: any, signSchema: SignSchema) => {
            const c = nacl;
            const d = prepareForScalarMult(sk, hashfunc, signSchema);

            // sharedKey = pack(p = d (derived from sk) * q (derived from pk))
            const q = [c.gf(), c.gf(), c.gf(), c.gf()];
            const p = [c.gf(), c.gf(), c.gf(), c.gf()];
            const sharedKey = new Uint8Array(Key_Size);
            c.unpack(q, pk);
            c.scalarmult(p, q, d);
            c.pack(sharedKey, p);
            // salt the shared key
            for (let i = 0; i < Key_Size; ++i) {
                sharedKey[i] ^= salt[i];
            }
            // return the hash of the result
            const sharedKeyHash = new Uint8Array(Key_Size);
            hashfunc(sharedKeyHash, sharedKey, Key_Size, signSchema);
            return sharedKeyHash;
        },
    };
})();
