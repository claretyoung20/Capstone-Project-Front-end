import { Entity } from './entity.interface';

export interface Address extends Entity {
    city?: string;
    street?: string;
    country?: string;
    supportEmail?: string;
    contactNumber?: string;
    restaurantId?: number;
}


