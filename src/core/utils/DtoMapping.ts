import { AccountRestriction } from '../../model/account/AccountRestriction';
import { AccountRestrictions } from '../../model/account/AccountRestrictions';
import { AccountRestrictionsInfo } from '../../model/account/AccountRestrictionsInfo';
import { Address } from '../../model/account/Address';
import { RestrictionType } from '../../model/account/RestrictionType';
import { MosaicId } from '../../model/mosaic/MosaicId';

export class DtoMapping {

    /**
     * Create AccountRestrictionsInfo class from Json.
     * @param {object} dataJson The account restriction json object.
     * @returns {module: model/Account/AccountRestrictionsInfo} The AccountRestrictionsInfo class.
     */
    public static extractAccountRestrictionFromDto(accountRestrictions: any): AccountRestrictionsInfo {
        return new AccountRestrictionsInfo(
            accountRestrictions.meta,
            new AccountRestrictions(Address.createFromEncoded(accountRestrictions.accountRestrictions.address),
                accountRestrictions.accountRestrictions.restrictions.map((prop: any) => {
                    switch (prop.restrictionType) {
                        case RestrictionType.AllowAddress:
                        case RestrictionType.BlockAddress:
                            return new AccountRestriction(prop.restrictionType,
                                prop.values.map((value: any) => Address.createFromEncoded(value)));
                        case RestrictionType.AllowMosaic:
                        case RestrictionType.BlockMosaic:
                            return new AccountRestriction(prop.restrictionType,
                                prop.values.map((value: any) => new MosaicId(value)));
                        case RestrictionType.AllowTransaction:
                        case RestrictionType.BlockTransaction:
                            return new AccountRestriction(prop.restrictionType, prop.values);
                        default:
                            throw new Error(`Invalid restriction type: ${prop.restrictionType}`);
                    }
                })));
    }
}
