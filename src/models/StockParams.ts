import { isDateStringFormat, isBefore } from '../helpers/dateHelpers';
import IStockParams from '../interfaces/IStockParams';

export default class StockParams implements IStockParams {
  symbol: string;
  since: string;
  until: string;

  constructor(params: any){
    this.symbol = params.symbol;
    this.since = params.since;
    this.until = params.until;
  }

  /**
   * return true if this.since and this.until 
   * are in YYYY-MM-DD format
   */
  correctlyFormattedDates(): boolean {
    return isDateStringFormat(this.since) && isDateStringFormat(this.until);
  }

  datesInOrder(): boolean {
    return isBefore(this.since, this.until);
  }

  /**
   * return false if any fields missing or misformatted
   */
  validate(): void {
    if (!this.symbol || !this.since || !this.until){
      throw new Error('not all required parameters provided. please include symbol, since, and until');
    }
    if (!this.correctlyFormattedDates()){
      throw new Error('date strings are not in expected YYYY-MM-DD format');
    }
    if (!this.datesInOrder()){
      throw new Error('make sure the until date comes after the since date');
    }
  }
}