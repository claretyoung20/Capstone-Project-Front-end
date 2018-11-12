import { Entity } from './entity.interface';

export interface SocialMedia extends Entity {
    link: string,
    name: string,
    restaurantId: number
}
