import { Moment } from 'moment';
import { Entity } from './entity.interface';

export interface Coupon extends Entity {
    code?: string;
    dateCreated?: Moment;
    dateUpdated?: Moment;
    endDate?: Moment;
    isActive?: boolean;
    noPerUser?: number;
    price?: number;
    startFromDate?: Moment;
    maxAmountToApply?: number;
    restaurantId?: number;
}
