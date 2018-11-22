import { Entity } from './entity.interface';

export interface Table extends Entity {
    isAvaliable?: boolean;
    persons?: number;
    price?: number;
    imageUrl?: string;
    restaurantId?: number;
}
