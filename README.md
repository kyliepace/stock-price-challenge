# Graphy Backend Coding Challenge


## Running Locally
`npm run dev` will run the express application locally and watch for changes made in the `src` typescript folder.

If you are using vscode, enable auto attach node process to make use of the vscode javascript debugger. You can do that with `command + shift + p` and selecting `Debug: Toggle Auto Attach`.


## Description of Solution
I broke the code into layers so all of the data retrieval logic is handled by the `services/DataService` class while all of the graphing logic is in `services/D3`. 

I added a logging tracer library so that each incoming request will receive an id and all logs related to that request will be logged with that id, making querying the logs by request much easier.

The incoming parameters are passed into a StockParams model to ensure typing and validation. If any of the required parameters are missing, or if the timestamps are in the wrong format, or if the since time is after the until time, then the controller will return a 400 status and neither the api nor redis will be queried.

The DataService layer looks to see if that combination of stock + since/to dates has already been queried and if so, returns the data from redis. If it hasn't already been queried, the data is retried from the given api and saved to redis.

The redis key is built from the required parameters and matches the parameters sent to the stock data api. The value is a stringified json of the nested `daily_prices` object returned from the stock api.


## Reasoning Behind Technical Choices

### architecture
Lately I've been building lambda functions that can individually scale as needed, but running these locally can be trickier and the benefits of this architecture neither outweighted the negatives nor contributed to solving the challenge at hand.

Express architecture is based off of [bulletproof nodejs](https://softwareontheroad.com/ideal-nodejs-project-structure/) ideas for organisation, with the aim of future-proofing expansion of middleware and routes. 

### redis

For redis I was tempted to make use of sorted sets and hashes instead of the very simple query I used here. What I don't love about this simple approach is that results are duplicated across overlapping time ranges.

In this alternative approach, data would not be duplicated in redis. I'd store the prices for a stock by day in a hashed index, and I'd set that hash key as the value in a sorted set, where each symbol has its own sorted set. Each date's epoch time value would be used to quickly query for time ranges. 
The trade-off of this approach though is that, for one, at this point redis would be being used as a database for all stock data instead of as a cache of each request as described in the challenge instructions, and two, it introduces additional logic and complexity, most notably how to handle situations where only some of the data range exists in redis.

The reason I stuck with the solution I did is because 1. I think it fits the use description better than the alternative, 2. it's simplier and as a dev I know it's very tempting to over complicate things 😄. 

I didn't set an explicit expire time on the redis entries because I don't expect the price values to be changing, but a better understanding of the data source could warrant a change to the logic. In that case, the scope of change is limited to a single method on the DataService class.

## Trade-offs I Made or Anything I Left Out

## What I Did Differently

## What I Would Do Differently If I Were to Spend More Time On This

- more clever redis strategy, perhaps make use of a sorted range to store data by date and query a range of dates, so that stock data for a given day is not duplicated across different ranges

- request body param validation


- containerize with Docker, depending on deployment strategy & infrastructure

- use a cloud redis instance

- use redis pubsub functionality to make pipeline event-driven