

/**
 * Account restriction type
 * 0x01	The restriction type is an address.
 * 0x02	The restriction type is mosaic id.
 * 0x03	The restriction type is a transaction type.
 * 0x04	restriction type sentinel.
 * 0x80 + type	The restriction is interpreted as a blocking operation.
 */

export enum RestrictionType {
    AllowAddress = 0x01,
    AllowMosaic = 0x02,
    AllowTransaction = 0x04,
    Sentinel = 0x05,
    BlockAddress = (0x80 + 0x01),
    BlockMosaic = (0x80 + 0x02),
    BlockTransaction = (0x80 + 0x04),
}
