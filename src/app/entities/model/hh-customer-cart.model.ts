import { Moment } from 'moment';

export interface IHHCustomerCart {
    id?: number;
    dateCreated?: Moment;
    dateUpdated?: Moment;
    hHProductId?: number;
}

export class HHCustomerCart implements IHHCustomerCart {
    constructor(public id?: number, public dateCreated?: Moment, public dateUpdated?: Moment, public hHProductId?: number) {}
}
