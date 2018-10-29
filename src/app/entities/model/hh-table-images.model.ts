export interface IHHTableImages {
    id?: number;
    imageUrl?: string;
    restaurantId?: number;
}

export class HHTableImages implements IHHTableImages {
    constructor(public id?: number, public imageUrl?: string, public restaurantId?: number) {}
}
