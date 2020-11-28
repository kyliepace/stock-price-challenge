import { scaleLinear } from 'd3-scale';
import { extent } from 'd3-array';
import IGraphData from '../interfaces/IGraphData';
import logger from '../loaders/Logger';

/**
 * D3 service
 */
export default class GraphService {

  /**
   * could use d3.extent to find min, max, too
   */
  scale(dataArray: number[]){
    return scaleLinear()
      // @ts-ignore: typescript problem with extent
      .domain(extent(dataArray))
  }

  /**
   * 
   * project the range of dates onto line chart
   */
  scaleDates(data: number[]){
    return this.scale(data).rangeRound([0, 40])
  }

  /**
   * 
   * project the numbers onto line chart scale
   */
  scaleValues(data: number[]){
    return this.scale(data).rangeRound([0, 20])
  }

  /**
   * Use D3 to map values to the (x, y) position on the ASCII line chart.
   * https://github.com/d3/d3-scale#linear-scales
   * https://observablehq.com/@d3/d3-scalelinear
   *
   * @example
   * const x = scaleLinear().domain([-100, 100]).range([0, 10]);
   * x(35); // 6.75
   * x(-80); // 1
   */
  draw(data: IGraphData): Promise<string>{
    const x = this.scaleValues(data.values);
    const y = this.scaleDates(data.dates);

    // pass x and y to reducer function
    const reducer = this.groupValues(x, y, data.dates);
    // group all y values that exist for each x value
    const groupedValues = this.buildRows(data.values, reducer)

    const plot = this.buildPlot(groupedValues);
    logger.info(plot)
    return Promise.resolve(plot)
  }

  /**
   * convert object with y values grouped by x value
   * into a string divided by newlines
   * where each row before a newline represents a price value
   * and has markings separated by y-scaled time values
   * @param groupedValues {[key: number]: number[]}
   * @returns string as plot e.g.
   *          x     x \n (this is the highest value and occured twice)
   *    x             \n (this is the next highest value and occured once)
   */
  buildPlot(groupedValues: any): string{
    return Object.values(groupedValues)
    // start with the highest value so will have to reverse
    .reverse()
    .map((arrayOfTimes: any) => (
      this.turnArrayIntoPaddedString(arrayOfTimes)
    ))
    .join('\n')
  }

  /**
   * matching values to console log spaces
   * @param arrayOfTimes array of scaled y values
   * we want to translate each y scale unit into one space
   */
  turnArrayIntoPaddedString(arrayOfTimes: number[]){
    return arrayOfTimes.map((spacing: number) => (
      `${this.padSpaces(spacing)}x`
    )).join('')
  }

  /**
   * turn array of values into an object
   * where each field equals a value
   * and each value is an array of all the scaled timestamps 
   * with that value
   * @param values 
   * @param reducer 
   * @returns {[price value]: [y(date), y(date)]}
   */
  buildRows(values: number[], reducer: any){
    return values.reduce(reducer, {});
  }

  /**
   * 
   * @param x x scaler function
   * @param y y scaler function
   * @param dates array of dates
   */
  groupValues(x: Function, y: Function, dates: number[]) {
    return function reducer(plot: any, value: number, index: number){
      const scaledValue = x(value);
      let row = plot[scaledValue];
      const time = y(dates[index]);
  
      if (row){
        const calculatedSpaces = time - row[row.length - 1];
        if (calculatedSpaces > 0){
          row.push(calculatedSpaces);
        }
        else row.unshift(time)
      }
      else {
        row = [time]
      }
      plot[scaledValue] = row;
      return plot;
    }
  }

  padSpaces(spacing: number): string {
    return new Array(spacing).fill('').join(' ')
  }
} 