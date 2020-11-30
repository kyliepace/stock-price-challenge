import { Price } from '../enums/Price';
import { toEpochTime } from '../helpers/dateHelpers';
import { toInt } from '../helpers/numberHelpers';
import IGraphData from '../interfaces/IGraphData';
import IStockData from '../interfaces/IStockData';

/**
 * transform and optionally filter stock price data
 * returned from Data Service so that it can be
 * used by GraphService
 */
export default class StockToGraphAdaptor {
  data: IStockData;
  constructor(data: IStockData){
    this.data = data;
  }

  /**
   * transforms API stock data into array of dates and array of values
   * @param price which type of price we want to see
   * defaults to "close"
   */
  filter(price = Price.close): IGraphData {
    const data: IGraphData = {
      dates: [],
      values: []
    };

    return Object.keys(this.data).reduce((graphData, dateString: string) => {
      const filteredPrice = toInt(this.data[dateString][price]);
      graphData.dates.push(toEpochTime(dateString));
      graphData.values.push(filteredPrice);
      return graphData;
    }, data);
  }


  /**
   * convert query params into a label string
   */
  makeLabel(labelObject: any): string {
    return Object.keys(labelObject)
      .map((key: string) => {
        return `${key}: ${labelObject[key]}`
      })
      .join('')
  }
}