import { Entity } from './entity.interface';

export interface Table extends Entity {
    isAvaliable?: boolean;
    price?: number;
    imageUrl?: string;
    restaurantId?: number;
    tableTypeId?: number;
}
