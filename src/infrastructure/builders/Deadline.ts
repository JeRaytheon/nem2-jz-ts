import { RawUInt64 as uint64 } from '../../core/format';

export default function deadline(deadlineParam:any) {
    const NetworkTime = (new Date()).getTime() - 1459468800000;
    const deadlineValue = deadlineParam || 60 * 60 * 1000;
    return uint64.fromUint(deadlineValue + NetworkTime);
}