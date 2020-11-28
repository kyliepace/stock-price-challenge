import { scaleLinear } from 'd3-scale';
import { extent } from 'd3-array';
import IGraphData from '../interfaces/IGraphData';
import logger from '../loaders/Logger';

/**
 * D3 service
 */
export default class GraphService {

  constructor() {

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

    // put each scaledValue into an array [padding, x padding, x]
    const plot = Object.values(data.values.reduce((plot: any, value, index) => {
      const scaledValue = x(value);
      let row = plot[scaledValue];
      const time = y(data.dates[index]);
      // row.push(time);
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
    }, {}))
      .reverse()
      .map((x: any, index: number) => {
        return x.map((spacing: number) => {
          return `${this.padSpaces(spacing)}x`
        }).join('')
      })
      .join('\n')

    console.log(plot)
    return Promise.resolve(plot)
  }

  padSpaces(spacing: number): string {
    return new Array(spacing).fill('').join(' ')
  }
} 