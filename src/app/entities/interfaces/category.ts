import { Entity } from './entity.interface';
import { Moment } from 'moment';

export interface Category extends Entity {
    dateCreated?: Moment;
    dateUpdated?: Moment;
    name?: string;
    restaurantId?: number;
    productTypeId?: number;
}
