import { Entity } from './entity.interface';

export interface Table extends Entity {
    isAvaliable?: boolean;
    price?: number;
    imageUrl?: string;
    restaurantId?: number;
    table_imageContentType?: string;
    table_image?: any;
    tableTypeId?: number;
}
