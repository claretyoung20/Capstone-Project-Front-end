export interface IHHWorkingDay {
    id?: number;
    day?: string;
}

export class HHWorkingDay implements IHHWorkingDay {
    constructor(public id?: number, public day?: string) {}
}
