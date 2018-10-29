import { Moment } from 'moment';

export interface IHHSaleOrder {
    id?: number;
    basePrice?: number;
    originalPrice?: number;
    discountAmount?: number;
    dateCreated?: Moment;
    dateUpdated?: Moment;
    hHOrderId?: number;
    hHProductId?: number;
}

export class HHSaleOrder implements IHHSaleOrder {
    constructor(
        public id?: number,
        public basePrice?: number,
        public originalPrice?: number,
        public discountAmount?: number,
        public dateCreated?: Moment,
        public dateUpdated?: Moment,
        public hHOrderId?: number,
        public hHProductId?: number
    ) {}
}
