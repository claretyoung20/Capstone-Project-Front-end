import { Moment } from 'moment';

export interface ICustomer {
    id?: number;
    firstName?: string;
    lastName?: string;
    email?: string;
    phoneNumber?: string;
    dateOfBirth?: Moment;
    address?: string;
    dateCreated?: Moment;
    lastDateUpdated?: Moment;
    status?: boolean;
    imageUrl?: string;
    password?: string;
    resetKey?: string;
    resetDate?: Moment;
}

export class Customer implements ICustomer {
    constructor(
        public id?: number,
        public firstName?: string,
        public lastName?: string,
        public email?: string,
        public phoneNumber?: string,
        public dateOfBirth?: Moment,
        public address?: string,
        public dateCreated?: Moment,
        public lastDateUpdated?: Moment,
        public status?: boolean,
        public imageUrl?: string,
        public password?: string,
        public resetKey?: string,
        public resetDate?: Moment
    ) {
        this.status = this.status || false;
    }
}
