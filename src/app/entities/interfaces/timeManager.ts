import { Entity } from './entity.interface';

export interface TimeManager extends Entity {
    day: string,
    endTime: string,
    restaurantId: number,
    startTime: string
}
