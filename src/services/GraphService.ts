import { scaleLinear } from 'd3-scale';
import { extent } from 'd3-array';
import IGraphData from '../interfaces/IGraphData';
import logger from '../loaders/Logger';
import * as constants from '../constants/config.json';

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
    return this.scale(data).rangeRound([0, constants.plot.X_MAX])
  }

  /**
   * 
   * project the numbers onto line chart scale
   */
  scaleValues(data: number[]){
    return this.scale(data).rangeRound([0, constants.plot.Y_MAX])
  }

  /**
   * Use D3 to map values to the (x, y) position on the ASCII line chart.
   * https://github.com/d3/d3-scale#linear-scales
   * https://observablehq.com/@d3/d3-scalelinear
   *
   */
  draw(data: IGraphData): Promise<string>{
    const x = this.scaleDates(data.dates);
    const y = this.scaleValues(data.values);

    // pass x and y to reducer function
    const reducer = this.groupValues(x, y, data.dates);
    // group all y values that exist for each x value
    const groupedValues = this.buildRows(data.values, reducer);
    console.log(groupedValues)

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
    return '\n' + Object.values(groupedValues)
    // start with the highest value so will have to reverse
    .reverse()
    .map((arrayOfTimes: any) => arrayOfTimes.join(''))
    .join('\n')
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
   * return a function that will be used to group markers for each row
   * each row is all the days that had a price value,
   * where a value has been scaled & rounded to project onto chart
   * @param x x scaler function
   * @param y y scaler function
   * @param dates array of dates
   */
  groupValues(x: Function, y: Function, dates: number[]) {
    return function reducer(plot: any, value: number, index: number){
      const scaledValue = y(value);
      let row = plot[scaledValue] || new Array(constants.plot.X_MAX).fill(' ');
      const time = x(dates[index]); // this is the place in the row the mark needs to go
      row.splice(time, 0, constants.plot.marker);
      plot[scaledValue] = row;
      return plot;
    }
  }
} 