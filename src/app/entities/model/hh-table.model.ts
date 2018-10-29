export interface IHHTable {
    id?: number;
    isAvailiable?: boolean;
    price?: number;
    no_of_chair?: number;
    restaurantId?: number;
}

export class HHTable implements IHHTable {
    constructor(
        public id?: number,
        public isAvailiable?: boolean,
        public price?: number,
        public no_of_chair?: number,
        public restaurantId?: number
    ) {
        this.isAvailiable = this.isAvailiable || false;
    }
}
