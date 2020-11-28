export default interface IStockData {
  // each date YYYY-MM-DD with an object of prices
  [key: string]: {
    open: number,
    high: number,
    low: number,
    close: number
  }
}