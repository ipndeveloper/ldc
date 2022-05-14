import { Injectable } from '@angular/core';
import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

function padNumber(value: number) {
    if (isNumber(value)) {
        return `0${value}`.slice(-2);
    } else {
        return '';
    }
}

function isNumber(value: any): boolean {
    return !isNaN(toInteger(value));
}

function toInteger(value: any): number {
    return parseInt(`${value}`, 10);
}

@Injectable()
export class NgbDateARParserFormatter extends NgbDateParserFormatter {
    parse(value: string): NgbDateStruct {
        if (value) {
            const newDate = value.replace(/-/g, '/');
            const dateParts = newDate.trim().split('/');
            let posYear = 0;
            const posMonth = 1;
            let posDay = 2;

            if (dateParts[0].length === 2) {
                posYear = 2;
                posDay = 0;
            }

            // Para formatos 31/12/2010
            if (dateParts.length === 1 && isNumber(dateParts[posYear])) {
                return {year: toInteger(dateParts[posYear]), month: 1, day: 1};
            } else if (dateParts.length === 2 && isNumber(dateParts[posYear]) && isNumber(dateParts[posMonth])) {
                return {year: toInteger(dateParts[posYear]), month: toInteger(dateParts[posMonth]), day: 1};
            } else if (dateParts.length === 3 && isNumber(dateParts[posYear]) &&
                isNumber(dateParts[posMonth]) && isNumber(dateParts[posDay])) {
                const year = toInteger(dateParts[posYear]);
                const month = toInteger(dateParts[posMonth]);
                const day = toInteger(dateParts[posDay]);

                if (this.isValidDate(day, month, year)) {
                    return {year, month, day};
                } else {
                    return {year: -1, month: 0, day: 0};
                }
            }
        }
        return {day: 0, month: 0, year: 0};
    }

    format(date: NgbDateStruct): string {
        let stringDate = '';
        if (date) {
            stringDate += isNumber(date.day) ? padNumber(date.day) + '/' : '';
            stringDate += isNumber(date.month) ? padNumber(date.month) + '/' : '';
            stringDate += date.year.toString();
        }
        return stringDate;
    }

    private isValidDate = (d, m, y) => {
        m = parseInt(m, 10) - 1;
        return m >= 0 && m < 12 && d > 0 && d <= this.daysInMonth(m, y);
    }

    private daysInMonth = (m, y) => {
        switch (m) {
            case 1 :
                return (y % 4 === 0 && y % 100) || y % 400 === 0 ? 29 : 28;
            case 8 : case 3 : case 5 : case 10 :
                return 30;
            default :
                return 31;
        }
    }
}
