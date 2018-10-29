import { Moment } from 'moment';

export interface IReservation {
    id?: number;
    time?: string;
    reserve_date?: Moment;
    comment?: string;
    status?: number;
    customerId?: number;
    hHTableId?: number;
}

export class Reservation implements IReservation {
    constructor(
        public id?: number,
        public time?: string,
        public reserve_date?: Moment,
        public comment?: string,
        public status?: number,
        public customerId?: number,
        public hHTableId?: number
    ) {}
}
