import { Entity } from './entity.interface';

export interface Customer extends Entity {
    address: string,
    dateCreated: string,
    dateOfBirth: string,
    dateUpdated: string,
    email: string,
    firstName: string,
    imgUrl: string,
    lastName: string,
    password: string,
    phoneNumber: string,
    resetDate: string,
    reset_Key: string,
    restaurantId: number,
    status: boolean
}
