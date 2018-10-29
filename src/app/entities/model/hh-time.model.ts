export interface IHHTime {
    id?: number;
    startTime?: string;
    endTime?: string;
    restaurantId?: number;
}

export class HHTime implements IHHTime {
    constructor(public id?: number, public startTime?: string, public endTime?: string, public restaurantId?: number) {}
}
