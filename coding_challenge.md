![Graphy Careers](https://graphy-static.ams3.cdn.digitaloceanspaces.com/careers-alt.png)

# Graphy Backend Coding Challenge

Hi there! 👋

Thank you for your interest in joining the Graphy team. This open-ended coding challenge is part of our evaluation process. We believe that this approach is better than asking you to solve interview puzzles or to write algorithms from memory (as if Wikipedia didn't exist).

Because the challenge is open-ended, it's possible to spend a long time on this. Please limit yourself to working on this challenge for **no more than 6 hours**. It's expected that you will not get through all the requirements (or at least not to the level that you'd like). That's okay! As you'll see, articulating what you'd envision working on next is part also of the challenge.

## The challenge

Your task is to write a small API that prints out historical stock data as a basic ASCII line chart for a given stock symbol.

## Prerequisites

1. Make sure you have these installed on your machine:
    1. [Node](https://nodejs.org/en/)
    2. [Yarn](https://yarnpkg.com/en/docs/install) (optional)
    3. [Redis](https://redis.io/topics/quickstart) (recommended)
2. Follow the setup instructions below.

## Setup

1. Clone this repo to your local machine.
2. Run `yarn` (or `npm install`).
3. Run `nodemon src/index.js` to start the server in dev mode.

## Requirements

1. Implement a `GET /ascii` endpoint that accepts four query params (`symbol`; `since`; `until`; and `price`).
2. `symbol` is the stock symbol to generate the line chart for (eg APPL for Apple, MSFT for Microsoft etc).
3. `since` and `until` are the start and end dates in YYYY-MM-DD format (both inclusive).
4. `price` is optional and can be `open`, `high`, `low` or `close` (default).
5. To generate the line chart, you'll need stock data. We set up a wrapper around a third-party service (Alpha Vantage) that provides daily prices (open, high, low, close) over a period. For instance, to fetch stock data for `MSFT` from `2019-06-01` to `2019-07-01`, make a GET request to `https://stock-data.graphy.now.sh` with `symbol=MSFT`, `since=2019-06-01` and `until=2019-07-01` as its query params. Test this by running:

```bash
curl -d symbol=MSFT \
-d since="2019-06-01" -d until="2019-07-01" \
-G https://stock-data.graphy.now.sh
```

6. Stock data is available Mon–Fri and covers 20 years.
7. Implement a basic caching mechanism to cache repeat requests with the same input (symbol and date range). Use Redis for that.
8. Examples of responses are given below. Assuming the API you'll build runs locally at `localhost:8000`.

## Examples

**First four weeks of Uber's IPO**

```bash
curl -d symbol=UBER \
-d since="2019-05-10" -d until="2019-06-07" \
-G http://localhost:8000/ascii
```

```
                                  + +   
                                      + 
        +                               
                                +       
+     +   + + + +   +         +         
                  +   +     +           
    +                   + +             
                                        
                                        
  +                                     
```

**Spotify's last 2 months (plus another try at designing this)**

```bash
curl -d symbol=SPOT \
-d since="2019-05-13" -d until="2019-07-12" \
-G http://localhost:8000/ascii
```

```
                                                                                + + + 
                                                +   + + + +                   +       
                                            + +   +         +     + + + + + +         
                                          +                   + +                     
                                    + + +                                             
  + + +                           +                                                   
+       + + +                   +                                                     
              +         +     +                                                       
                  + + +   +                                                           
                +           +
```

## Guidelines & some tips

1. We recommend using [d3-scale](https://github.com/d3/d3-scale) to map values to the (x, y) position on the ASCII line chart. Read about [linear scales in D3](https://observablehq.com/@d3/d3-scalelinear). Or, if you prefer, you can skip D3 entirely and do it from scratch.
2. We don't expect 100% test coverage but we do expect to see at least some level of testing.
3. Please don't use any third-party plotting library (gnuplot etc.) that generates plots for you. It's absolutely fine if the API you write generates charts that are very basic (as shown in the examples).
4. To make things simpler, the generated line charts can be of any width or height.
5. You may use TypeScript if you want to.
6. We value attention to small details. Be creative! 🎨

## How to submit your code

1. If you use GitHub, upload your solution to GitHub and make the repo private. Add [@mikeporterdev](https://github.com/mikeporterdev), [@iloire](https://github.com/iloire), and [@igorsechyn](https://github.com/igorsechyn) as collaborators ([how do I do that?](https://help.github.com/en/articles/inviting-collaborators-to-a-personal-repository)).
2. Alternatively, zip the repo and [email it to us](mailto:roman@graphyapp.com).
