import { Entity } from './entity.interface';
import { Moment } from 'moment';

export interface UserCustomer extends Entity {
    address?: string;
    dateCreated?: Moment;
    dateUpdated?: Moment;
    dateOfBirth?: Moment;
    phoneNumber?: string;
    status?: boolean;
    restaurantId?: number;
    userLogin?: string;
    userId?: number;
}


export interface Customer extends Entity {
    address?: string,
    dateCreated?: string,
    dateOfBirth?: string,
    dateUpdated?: string,
    email?: string,
    firstName?: string,
    imgUrl?: string,
    lastName?: string,
    password?: string,
    phoneNumber?: string,
    resetDate?: string,
    reset_Key?: string,
    restaurantId?: number,
    status?: boolean,
    login?: string,
    userId?: number;
}
