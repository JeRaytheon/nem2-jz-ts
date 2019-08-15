

import {ChronoUnit, Instant, LocalDateTime, ZoneId} from 'js-joda';
import {UInt64} from '../UInt64';

/**
 * The deadline of the transaction. The deadline is given as the number of seconds elapsed since the creation of the nemesis block.
 * If a transaction does not get included in a block before the deadline is reached, it is deleted.
 */
export class Deadline {

    /**
     * @type {number}
     */
    public static timestampNemesisBlock = 1459468800;

    /**
     * Deadline value
     */
    public value: LocalDateTime;

    /**
     * Create deadline model
     * @param deadline
     * @param chronoUnit
     * @returns {Deadline}
     */
    public static create(deadline: number = 2, chronoUnit: ChronoUnit = ChronoUnit.HOURS): Deadline {
        const networkTimeStamp = (new Date()).getTime();
        const timeStampDateTime = LocalDateTime.ofInstant(Instant.ofEpochMilli(networkTimeStamp), ZoneId.SYSTEM);
        const deadlineDateTime = timeStampDateTime.plus(deadline, chronoUnit);

        if (deadline <= 0) {
            throw new Error('deadline should be greater than 0');
        } else if (timeStampDateTime.plus(24, ChronoUnit.HOURS).compareTo(deadlineDateTime) !== 1) {
            throw new Error('deadline should be less than 24 hours');
        }

        return new Deadline(deadlineDateTime);
    }

    /**
     * @internal
     * @param value
     * @returns {Deadline}
     */
    public static createFromDTO(value: number[]): Deadline {
        const dateSeconds = (new UInt64(value)).compact();
        const deadline = LocalDateTime.ofInstant(
            Instant.ofEpochMilli(Math.round(dateSeconds + Deadline.timestampNemesisBlock * 1000)),
            ZoneId.SYSTEM);
        return new Deadline(deadline);
    }

    /**
     * @param deadline
     */
    private constructor(deadline: LocalDateTime) {
        this.value = deadline;
    }

    /**
     * @internal
     */
    public toDTO(): number[] {
        return UInt64.fromUint(
            (this.value.atZone(ZoneId.SYSTEM).toInstant().toEpochMilli() - Deadline.timestampNemesisBlock * 1000),
        ).toDTO();
    }
}
