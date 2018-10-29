import { Moment } from 'moment';

export interface IHHCategory {
    id?: number;
    name?: string;
    createdAt?: Moment;
    updatedAt?: Moment;
    restaurantId?: number;
}

export class HHCategory implements IHHCategory {
    constructor(
        public id?: number,
        public name?: string,
        public createdAt?: Moment,
        public updatedAt?: Moment,
        public restaurantId?: number
    ) {}
}
