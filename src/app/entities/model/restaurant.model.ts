export interface IRestaurant {
    id?: number;
    name?: string;
    code?: string;
    website?: string;
    isActive?: boolean;
}

export class Restaurant implements IRestaurant {
    constructor(public id?: number, public name?: string, public code?: string, public website?: string, public isActive?: boolean) {
        this.isActive = this.isActive || false;
    }
}
