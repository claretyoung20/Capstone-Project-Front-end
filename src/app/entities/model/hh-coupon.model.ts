import { Moment } from 'moment';

export interface IHHCoupon {
    id?: number;
    code?: string;
    datedCreated?: Moment;
    dateUpdated?: Moment;
    startFrom?: Moment;
    endDate?: Moment;
    noPerUser?: number;
    isActive?: boolean;
    price?: number;
    restaurantId?: number;
}

export class HHCoupon implements IHHCoupon {
    constructor(
        public id?: number,
        public code?: string,
        public datedCreated?: Moment,
        public dateUpdated?: Moment,
        public startFrom?: Moment,
        public endDate?: Moment,
        public noPerUser?: number,
        public isActive?: boolean,
        public price?: number,
        public restaurantId?: number
    ) {
        this.isActive = this.isActive || false;
    }
}
