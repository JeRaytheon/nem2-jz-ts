export class IdentityModel {


    name: string; //名称

    license: string;//营业执照

    bankAccountInfo: string;//银行帐号信息

    gpzjxbah: string;//GP中基协备案号


    jjzjxbah: string;//基金中基协备案号

    bz: string; //其它信息，如有请尽量使用json字符字符串

    /**
     * 身份模型对象封住成jsonStr
     * @param identity 身份对象
     * @return string
     */
    public static toJsonStr(identity: IdentityModel): string {
        return JSON.stringify(identity);
    }

}
