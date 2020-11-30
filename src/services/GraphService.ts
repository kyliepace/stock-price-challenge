import { scaleLinear } from 'd3-scale';
import { extent } from 'd3-array';
import IGraphData from '../interfaces/IGraphData';
import logger from '../loaders/Logger';
import * as constants from '../constants/config.json';

/**
 * D3 service
 */
export default class GraphService {
  plot: string = '';

  /**
   * 
   * If label exists, add it to the end of the graph string
   */
  appendLabel(label?: string){
    if (label){
      this.plot = this.plot.concat(`\n` + label);
    }
    return this;
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
  buildPlot(groupedValues: any){
    this.plot = '\n' + Object.values(groupedValues)
    // start with the highest value so will have to reverse
    .reverse()
    .map((arrayOfTimes: any) => arrayOfTimes.join(''))
    .join('\n');
    return this;
  }

  /**
   * turn array of values into an object
   * each value is array of all the x coordinates that match to that y value,
   * where the x and y points have been scaled & rounded to project onto chart
   * 
   * @returns {[price value]: [y(date), y(date)]}
   */
  buildRows(xValues: number[], yValues: number[], x: Function, y: Function): object {
    return yValues.reduce((plot: any, value: number, index: number) => {
      const scaledValue = y(value);
      const row = plot[scaledValue] || this.createRow();
      const time = x(xValues[index]); // this is the place in the row the mark needs to go
      row.splice(time, 0, constants.plot.marker);
      plot[scaledValue] = row;
      return plot;
    }, {});
  }

  /**
   * create a new array full of strings
   * length determined by constant value
   */
  createRow(): string[] {
    return new Array(constants.plot.X_MAX).fill(' ');
  }

    /**
   * Use D3 to map values to the (x, y) position on the ASCII line chart.
   * https://github.com/d3/d3-scale#linear-scales
   * https://observablehq.com/@d3/d3-scalelinear
   *
   */
  draw(data: IGraphData, label?: string): Promise<string>{
    const x = this.scaleDates(data.x);
    const y = this.scaleValues(data.y);

    // group all y values that exist for each x value
    const groupedValues = this.buildRows(data.x, data.y, x, y);

    const { plot } = this
      .buildPlot(groupedValues)
      .appendLabel(label);

    logger.info(plot)
    return Promise.resolve(plot);
  }

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
} 