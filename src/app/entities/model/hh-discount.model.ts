import { Moment } from 'moment';

export interface IHHDiscount {
    id?: number;
    amount?: number;
    startDate?: Moment;
    endDate?: Moment;
    percentage?: number;
    hHProductId?: number;
}

export class HHDiscount implements IHHDiscount {
    constructor(
        public id?: number,
        public amount?: number,
        public startDate?: Moment,
        public endDate?: Moment,
        public percentage?: number,
        public hHProductId?: number
    ) {}
}
