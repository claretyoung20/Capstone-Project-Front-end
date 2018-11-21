import { Moment } from 'moment';
import { Entity } from './entity.interface';

export interface Order extends Entity {
    baseTotal?: number;
    dateCreated?: Moment;
    dateUpdated?: Moment;
    totalPrice?: number;
    orderStatusId?: number;
    customerId?: number;
    couponId?: number;
    restaurantId?: number;
    staffStaffCode?: string;
    staffId?: number;
}
