import { Entity } from './entity.interface';
import { Moment } from 'moment';

export interface ICart extends Entity {
    dateCreated?: Moment;
    dateUpdated?: Moment;
    totalItem?: number;
    productName?: string;
    productPrice?: number;
    productId?: number;
    customerId?: number;
}
