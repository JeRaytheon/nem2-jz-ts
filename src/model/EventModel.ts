export class EventModel {

    name: string;    // 事件名称

    eventType: string; //事件类型

    describe: string;  //事件描述

    timeStamp: string; //事件时间戳

    bz: string; //其它信息，如有请尽量使用json字符字符串

    /**
     * 事件模型对象封住成jsonStr
     * @param event 事件对象
     * @return string
     */
    public static toJsonStr(event: EventModel): string {
        return JSON.stringify(event);
    }

}
