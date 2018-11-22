import { Entity } from './entity.interface';
import { Moment } from 'moment';

export interface Reservation extends Entity {
    comment?: string;
    status?: string;
    startTime?: string;
    endTime?: string;
    reserverDate?: Moment;
    updatedDate?: Moment;
    staffId?: number;
    bookTableId?: number;
    customerId?: number;
}
