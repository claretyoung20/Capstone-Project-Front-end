import { Entity } from './entity.interface';
import { Moment } from 'moment';

export interface Reservation extends Entity {
    comment?: string;
    status?: string;
    reserverDate?: Moment;
    updatedDate?: Moment;
    period?: string;
    staffId?: number;
    bookTableId?: number;
    customerId?: number;
}
