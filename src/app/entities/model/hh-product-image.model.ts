export interface IHHProductImage {
    id?: number;
    imageUrl?: string;
    hHProductId?: number;
}

export class HHProductImage implements IHHProductImage {
    constructor(public id?: number, public imageUrl?: string, public hHProductId?: number) {}
}
