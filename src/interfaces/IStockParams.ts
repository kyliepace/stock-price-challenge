export default interface IStockParams {
  // stock symbol to generate the line chart for
  symbol: string

  // start date in YYYY-MM-DD format
  since: string

  // end dates in YYYY-MM-DD format
  until: string
}