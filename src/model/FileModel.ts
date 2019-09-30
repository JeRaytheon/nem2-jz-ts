/**
 * 文件模型
 */
export class FileModel {

    name: string; //文件名

    fileType: string;//文件类型

    source: string; //文件路径

    md5: string; //文件md5

    describe: string; //文件描述

    timeStamp: string; //时间戳

    bz: string; //其它信息，如有请尽量使用json字符字符串

    /**
     * 文件模型对象封住成jsonStr
     * @param file 文件对象
     * @return string
     */
    public static toJsonStr(file: FileModel): string {
        return JSON.stringify(file);
    }
}
