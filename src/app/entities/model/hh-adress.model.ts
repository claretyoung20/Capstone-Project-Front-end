export interface IHHAdress {
    id?: number;
    street?: string;
    city?: string;
    country?: string;
    restaurantId?: number;
}

export class HHAdress implements IHHAdress {
    constructor(public id?: number, public street?: string, public city?: string, public country?: string, public restaurantId?: number) {}
}
