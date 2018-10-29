import { Moment } from 'moment';

export interface IHHOrder {
    id?: number;
    dateCreated?: Moment;
    dateUpdated?: Moment;
    status?: string;
    totalPrice?: number;
    base_total?: number;
    customerId?: number;
    userLogin?: string;
    userId?: number;
    hHCouponId?: number;
    restaurantId?: number;
}

export class HHOrder implements IHHOrder {
    constructor(
        public id?: number,
        public dateCreated?: Moment,
        public dateUpdated?: Moment,
        public status?: string,
        public totalPrice?: number,
        public base_total?: number,
        public customerId?: number,
        public userLogin?: string,
        public userId?: number,
        public hHCouponId?: number,
        public restaurantId?: number
    ) {}
}
