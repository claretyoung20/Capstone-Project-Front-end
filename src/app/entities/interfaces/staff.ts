import { Entity } from './entity.interface';

export interface Staff extends Entity {
    staffCode?: string;
    userLogin?: string;
    userId?: number;
    restaurantY?: string;
    restaurantId?: number;
}
