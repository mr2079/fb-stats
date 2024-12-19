import { Injectable } from '@angular/core';
import * as moment from 'moment-jalaali';

@Injectable({ providedIn: 'root' })
export default class UtilService {
  private readonly monthes: string[] = [
    'فروردین',
    'اردیبهشت',
    'خرداد',
    'تیر',
    'مرداد',
    'شهریور',
    'مهر',
    'آبان',
    'آذر',
    'دی',
    'بهمن',
    'اسفند',
  ];

  toLongTime(timestamp: number): string {
    const longTime = moment.unix(timestamp).format("HH:mm:ss");
    return longTime;
  }

  toShortTime(timestamp: number): string {
    const shortTime = moment.unix(timestamp).format("HH:mm");
    return shortTime;
  }

  toPersianDate(timestamp: number): string {
    const date = moment.unix(timestamp);
    const year = date.format("jYYYY");
    const month = date.format("jM");
    const day = date.format("jD");
    const monthName = this.monthes[+month - 1];
    const formattedData = `${day} ${monthName} ${year}`;
    return formattedData;
  }
}
