import { Entity } from './entity.interface';
import { Moment } from 'moment';

export interface ProductType extends Entity {
    dateCreated?: Moment;
    dateUpdated?: Moment;
    type?: string;
}
