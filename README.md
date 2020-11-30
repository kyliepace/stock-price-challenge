# Graphy Backend Coding Challenge


## Running Locally
`npm run dev` will run the express application locally and watch for changes made in the `src` typescript folder. The service will be available at `http://localhost:8000/`


## Description of Solution
I broke the code into layers so all of the data retrieval logic is handled by the `services/DataService` class while all of the graphing logic is in `services/D3`. 

I added a logging tracer library so that each incoming request will receive an id and all logs related to that request will be logged with that id, making querying the logs by request much easier.

The incoming parameters are passed into a StockParams model to ensure typing and validation. If any of the required parameters are missing, or if the timestamps are in the wrong format, or if the since time is after the until time, then the controller will return a 400 status and neither the api nor redis will be queried.

The DataService layer looks to see if that combination of stock + since/to dates has already been queried and if so, returns the data from redis. If it hasn't already been queried, the data is retried from the given api and saved to redis.

The redis key is built from the required parameters and matches the parameters sent to the stock data api. The value is a stringified json of the nested `daily_prices` object returned from the stock api.

I added an adaptor to transform the stock data into arrays of x and y axis data.

The GraphService layer is responsible for scaling these arrays of data to the ranges defined by constants, and logging the results as an ASCII line graph.


## Reasoning Behind Technical Choices

### architecture
Lately I've been building lambda functions that can individually scale as needed, but running these locally can be trickier and the benefits of this architecture neither outweighted the negatives nor contributed to solving the challenge at hand.

Express architecture is based off of [bulletproof nodejs](https://softwareontheroad.com/ideal-nodejs-project-structure/) ideas for organisation, with the aim of future-proofing expansion of middleware and routes. 

### redis

For redis I was tempted to make use of sorted sets and hashes instead of the very simple query I used here. What I don't love about this simple approach is that results are duplicated across overlapping time ranges.

In this alternative approach, data would not be duplicated in redis. I'd store the prices for a stock by day in a hashed index, and I'd set that hash key as the value in a sorted set, where each symbol has its own sorted set. Each date's epoch time value would be used to quickly query for time ranges. 
The trade-off of this approach though is that, for one, at this point redis would be being used as a database for all stock data instead of as a cache of each request as described in the challenge instructions, and two, it introduces additional logic and complexity, most notably how to handle situations where only some of the data range exists in redis.

The reason I stuck with the solution I did is because 1. I think it fits the use description better than the alternative, 2. it's simplier and matches the stock data api response. As a dev I know it's very tempting to over complicate things 😄. 

I didn't set an explicit expire time on the redis entries because I don't expect the price values to be changing, but a better understanding of the data source could warrant a change to the logic. In that case, the scope of change is limited to a single method on the DataService class.

### queries

Because the stock data api doesn't filter by price type and because I wanted to maintain consistency between the api and redis data sources, the data service layer knows nothing about the user's price parameter. 

## Trade-offs I Made or Anything I Left Out

### queries

By not filtering out the targeted price type from the api request, this solution opts for a larger redis value than is necessary for any client query. I could have broken up the stock data response so that each redis key represented the actual client request parameters with price type, but I chose against introducing this transformation step between api response and redis. If redis is being used truly as a cache of the data returned from the stock api for a given query, then I wanted to have it stash the response because that felt like the more expected behaviour. Plus, we could choose to add more query parameters later that I could imagine not working with pre-transformed redis data.

## What I Did Differently

## What I Would Do Differently If I Were to Spend More Time On This

- more clever redis strategy, perhaps make use of a sorted range to store data by date and query a range of dates, so that stock data for a given day is not duplicated across different ranges, if the use case warranted it.

- containerize with Docker, depending on deployment strategy & infrastructure

- use a cloud redis instance

- use pubsub to make pipeline event-driven, so services can scale independently and require different levels of authorization

- CI/CD pipeline to ensure linter and tests pass before merging branches or deploying