import { Entity } from './entity.interface';
import { Moment } from 'moment';

export interface SaleOrder extends Entity {
    basePrice?: number;
    dateCreated?: Moment;
    dateUpdated?: Moment;
    productId?: number;
    happyOrderId?: number;
}
