import { Moment } from 'moment';

export interface IHHProductType {
    id?: number;
    dateCreated?: Moment;
    dateUpdated?: Moment;
    type?: string;
}

export class HHProductType implements IHHProductType {
    constructor(public id?: number, public dateCreated?: Moment, public dateUpdated?: Moment, public type?: string) {}
}
