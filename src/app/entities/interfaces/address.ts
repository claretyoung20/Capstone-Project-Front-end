import { Entity } from './entity.interface';

export interface Address extends Entity {
    city: string,
    country: string,
    restaurantId: number,
    street: string
}


