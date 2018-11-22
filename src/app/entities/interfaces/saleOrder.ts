import { Entity } from './entity.interface';
import { Moment } from 'moment';

export interface SaleOrder extends Entity {
    basePrice?: number;
    dateCreated?: Moment;
    dateUpdated?: Moment;
    discountAmount?: number;
    originalPrice?: number;
    productId?: number;
    happyOrderId?: number;
}
