import { Entity } from './entity.interface';
import { Moment } from 'moment';

export interface ICart extends Entity {
    dateCreated?: Moment;
    dateUpdated?: Moment;
    totalItem?: number;
    productId?: number;
    customerId?: number;
}

export class Cart implements ICart {
    constructor(
        public dateCreated?: Moment,
        public dateUpdated?: Moment,
        public totalItem?: number,
        public productId?: number,
        public customerId?: number
    ) {}
}

