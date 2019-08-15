

import { Address } from '../account/Address';
import { NetworkType } from '../blockchain/NetworkType';
import { MosaicId } from '../mosaic/MosaicId';
import { AliasActionType } from '../namespace/AliasActionType';
import { NamespaceId } from '../namespace/NamespaceId';
import { UInt64 } from '../UInt64';
import { AddressAliasTransaction } from './AddressAliasTransaction';
import { Deadline } from './Deadline';
import { MosaicAliasTransaction } from './MosaicAliasTransaction';
import { Transaction } from './Transaction';

export abstract class AliasTransaction extends Transaction {

    /**
     * Create an address alias transaction object
     * @param deadline - The deadline to include the transaction.
     * @param aliasAction - The namespace id.
     * @param namespaceId - The namespace id.
     * @param address - The address.
     * @param networkType - The network type.
     * @param maxFee - (Optional) Max fee defined by the sender
     * @returns {AddressAliasTransaction}
     */
    public static createForAddress(deadline: Deadline,
                                   aliasAction: AliasActionType,
                                   namespaceId: NamespaceId,
                                   address: Address,
                                   networkType: NetworkType,
                                   maxFee: UInt64 = new UInt64([0, 0])): AliasTransaction {
        return AddressAliasTransaction.create(
            deadline,
            aliasAction,
            namespaceId,
            address,
            networkType,
            maxFee,
        );
    }

    /**
     * Create a mosaic alias transaction object
     * @param deadline - The deadline to include the transaction.
     * @param aliasAction - The namespace id.
     * @param namespaceId - The namespace id.
     * @param mosaicId - The mosaic id.
     * @param networkType - The network type.
     * @param maxFee - (Optional) Max fee defined by the sender
     * @returns {MosaicAliasTransaction}
     */
    public static createForMosaic(deadline: Deadline,
                                  aliasAction: AliasActionType,
                                  namespaceId: NamespaceId,
                                  mosaicId: MosaicId,
                                  networkType: NetworkType,
                                  maxFee: UInt64 = new UInt64([0, 0])): AliasTransaction {
        return MosaicAliasTransaction.create(
            deadline,
            aliasAction,
            namespaceId,
            mosaicId,
            networkType,
            maxFee,
        );
    }

}
