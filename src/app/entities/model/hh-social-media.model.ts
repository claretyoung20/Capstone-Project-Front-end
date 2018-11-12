export interface IHHSocialMedia {
    id?: number;
    name?: string;
    link?: string;
    restaurantId?: number;
}

export class HHSocialMedia implements IHHSocialMedia {
    constructor(public id?: number, public name?: string, public link?: string, public restaurantId?: number) {}
}
