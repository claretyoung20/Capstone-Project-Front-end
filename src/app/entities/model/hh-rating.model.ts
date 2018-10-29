import { Moment } from 'moment';

export interface IHHRating {
    id?: number;
    star?: number;
    comment?: string;
    dateCreated?: Moment;
    dateUpdated?: Moment;
    customerId?: number;
    restaurantId?: number;
}

export class HHRating implements IHHRating {
    constructor(
        public id?: number,
        public star?: number,
        public comment?: string,
        public dateCreated?: Moment,
        public dateUpdated?: Moment,
        public customerId?: number,
        public restaurantId?: number
    ) {}
}
