/* tslint:disable */
import { Injectable } from '@angular/core';

@Injectable()
export class TimeService {
    public YEAR: string = 'year';
    cconstructor() { }
    // if data is string
    fromString(string: string): TimeDate {
        if (!string) {
            console.log('String is null!');
            return new TimeDate();
        }
        const date = new Date(string);
        if (!(date instanceof Date) || isNaN(date.valueOf())) {
            console.log(`${string} is not valid type of date!`);
            return new TimeDate();
        }
        return new TimeDate(date);
    }

    current(): TimeDate {
        return new TimeDate(new Date());
    }
    // if data is Date
    fromDate(date: Date): TimeDate {
        if (date instanceof Date) {
            return new TimeDate(date);
        } else {
            return new TimeDate();
        }
    }
    fromTimeDatePicker(obj: any): TimeDate {
        if (!obj) {
            return new TimeDate();
        } else if (obj.jsdate) {
            return new TimeDate(new Date(obj.jsdate));
        } else if (obj.date) {
            return new TimeDate(new Date(Date.UTC(obj.date.year, obj.date.month - 1, obj.date.day, 0, 0)));
        } else {
            return new TimeDate();
        }
    }
}

export function compareDate(date1: Date, date2: Date) {
    const startDay = (date1.valueOf()) / 1000;
    const endDay = (date2.valueOf()) / 1000;
    const diff = endDay - startDay;
    if (diff > 0) { return 1; } else if (diff < 0) { return -1; } else { return 0; }
}

export class TimeDate {
    private date: Date;
    constructor(date?: Date) {
        this.date = date || null;
    }
    get(type: string = 'all') {
        switch (type) {
            case 'all': {
                return this.date;
            }
            case 'year': {
                return this.date.getFullYear();
            }
            default: {
                return this.date;
            }
        }
    }
    setUTC() {
        if (this.date) {
            const date = new Date(Date.UTC(this.date.getFullYear(), this.date.getMonth(), this.date.getDate(), this.date.getHours(), this.date.getMinutes()));
            this.date = date;
        }
        return this;
    }

    toISOString(): string {
        if (this.date) { return this.date.toISOString(); } else { return null; }
    }

    toTimeDatePickerValue(): any {
        if (this.date) {
            const day = this.date.getDate();
            const month = this.date.getMonth() + 1;
            const year = this.date.getFullYear();
            const result = {
                date: {
                    year: year,
                    month: month,
                    day: day
                }
            };
            return result;
        } else {
            return null;
        }
    }
}
