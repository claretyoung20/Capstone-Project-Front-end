import { Moment } from 'moment';

export interface IHHProduct {
    id?: number;
    name?: string;
    description?: string;
    createdDate?: Moment;
    updatedDate?: Moment;
    price?: number;
    hHProductTypeId?: number;
    hHCategoryId?: number;
    restaurantId?: number;
}

export class HHProduct implements IHHProduct {
    constructor(
        public id?: number,
        public name?: string,
        public description?: string,
        public createdDate?: Moment,
        public updatedDate?: Moment,
        public price?: number,
        public hHProductTypeId?: number,
        public hHCategoryId?: number,
        public restaurantId?: number
    ) {}
}
