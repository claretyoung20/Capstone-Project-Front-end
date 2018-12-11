import { Entity } from './entity.interface';
import { Moment } from 'moment';

export interface Product extends Entity {
    createdDate?: Moment;
    description?: string;
    name?: string;
    price?: number;
    updatedDate?: Moment;
    isAvailable?: boolean;
    showOnHomepage?: boolean;
    restaurantId?: number;
    categoryId?: number;
}
