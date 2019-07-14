![Graphy Careers](https://graphy-static.ams3.cdn.digitaloceanspaces.com/careers-alt.png)

# Graphy Backend Coding Challenge

Hey! 👋

Thanks for your interest in joining the Graphy team. This open-ended coding challenge is part of our evaluation process. We think (and hope you agree) that this approach is way better than asking you to solve interview puzzles or to scribble algorithms on a whiteboard.

We know this will be a significant investment of effort from your side, but one we hope will be worthwhile for both you and us. Even if your application to Graphy is ultimately unsuccessful, feel free to include what you produce for this challenge in your personal portfolio.

## Challenge

Write a small API that returns historical stock data as an ASCII line chart for a given stock symbol.

## Prerequisites

1. Make sure you have these installed on your machine:
    1. [Node](https://nodejs.org/en/)
    2. [Yarn](https://yarnpkg.com/en/docs/install) (optional)
    3. [Redis](https://redis.io/topics/quickstart) (recommended)
2. You'll need a GitHub account (alternatives are fine too).
3. Follow the setup instructions below.

## Setup

1. Clone this repo to your local machine.
2. Run `yarn` (or `npm install`).
3. Run `nodemon src/index.js` to start the server in dev mode.

## Guidelines

1. Implement a `GET /ascii` endpoint that accepts three required params (`symbol`; `since`; and `until`) and one optional param (price).
2. `symbol` is the stock symbol to generate the line chart for (eg APPL for Apple, MSFT for Microsoft etc).
3. `since` and `until` are the start and end dates in YYYY-MM-DD format (both inclusive).
4. `price` can be 'open', 'high', 'low' or 'close' (default).
5. To generate the line chart, you'll need stock data. We set up a wrapper around Alpha Vantage APIs (with a tweak) that returns daily prices (open, high, low, close) over a period. For instance, to fetch this data for MSFT from 2019-06-01 to 2019-07-01, make a GET request to `https://stock-data.graphy.now.sh` with symbol=`MSFT`, since=`2019-06-01` and until=`2019-07-01` as query params. Test it by running:

```
curl -d symbol=MSFT \
-d since="2019-06-01" -d until="2019-07-01" \
-G https://stock-data.graphy.now.sh
```

6. Stock data is available for work days and covers 20 years.
7. Implement a basic caching mechanism to cache repeat requests with the same input (symbol and date range). Use Redis for that.
8. Examples of responses are given below. Assuming the API you'll build runs locally at localhost:8000.

## Examples

### First four weeks of Uber's IPO

```
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

### Same as above, but fancier charts (you'll get more points 💪)

```
45.00   · · · · · · · · · · · · · · · · · ♦ ♦ · 
44.12   · · · · · · · · · · · · · · · · · · · ♦ 
43.24   · · · · ♦ · · · · · · · · · · · · · · · 
42.37   · · · · · · · · · · · · · · · · ♦ · · · 
41.49   ♦ · · ♦ · ♦ ♦ ♦ ♦ · ♦ · · · · ♦ · · · · 
40.61   · · · · · · · · · ♦ · ♦ · · ♦ · · · · · 
39.73   · · ♦ · · · · · · · · · ♦ ♦ · · · · · · 
38.86   · · · · · · · · · · · · · · · · · · · · 
37.98   · · · · · · · · · · · · · · · · · · · · 
37.10   · ♦ · · · · · · · · · · · · · · · · · · 

        |10   |15   |20   |23   |29   |3    
```

### Spotify last 2 months (plus another try at designing this)

```
curl -d symbol=SPOT \
-d since="2019-05-13" -d until="2019-07-12" \
-G http://localhost:8000/ascii
```

```
152.30  ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ▓ ▓ ▓ 
148.89  ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ▓ ░ ▓ ▓ ▓ ▓ ░ ░ ░ ░ ░ ░ ░ ░ ░ ▓ ░ ░ ░ 
145.47  ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ▓ ▓ ░ ▓ ░ ░ ░ ░ ▓ ░ ░ ▓ ▓ ▓ ▓ ▓ ▓ ░ ░ ░ ░ 
142.06  ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ▓ ░ ░ ░ ░ ░ ░ ░ ░ ░ ▓ ▓ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ 
138.65  ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ▓ ▓ ▓ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ 
135.23  ░ ▓ ▓ ▓ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ▓ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ 
131.82  ▓ ░ ░ ░ ▓ ▓ ▓ ░ ░ ░ ░ ░ ░ ░ ░ ░ ▓ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ 
128.41  ░ ░ ░ ░ ░ ░ ░ ▓ ░ ░ ░ ░ ▓ ░ ░ ▓ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ 
124.99  ░ ░ ░ ░ ░ ░ ░ ░ ░ ▓ ▓ ▓ ░ ▓ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ 
121.58  ░ ░ ░ ░ ░ ░ ░ ░ ▓ ░ ░ ░ ░ ░ ▓ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ 

        |13   |16   |21   |24   |30   |4    |7    |12   |17   |20   |25   |28   |3    |9      
```

## Requirements

1. It's up to you how the generated line charts should look like. But you'll get more points if the charts look more appealing, handle more use cases and include stuff like tick values (as shown in examples).
2. You should not use any third-party plotting library (gnuplot etc.) that generates plots for you. It's absolutely fine if the API you write generates charts that are super basic. But if you want to make them fancier, you may use things like [drawille](https://github.com/madbence/node-drawille) or [bresenham](https://github.com/madbence/node-bresenham).
3. You may consider using [D3 functions](https://github.com/d3/d3/blob/master/API.md) to make things easier.
3. We recommend to use [d3-scale](https://github.com/d3/d3-scale) to map values to the (x, y) position on the ASCII line chart. Read about [linear scales in D3](https://observablehq.com/@d3/d3-scalelinear). Or, if you prefer, you can skip D3 entirely and do it from scratch.
4. To make things simpler, the generated line charts can be of any width or height.
5. We value attention to small details. Be creative! 🎨

## Submission

1. If you use GitHub, upload your repo to GitHub and make it private. Add @romans as a collaborator.
2. Alternatively, zip the repo and email it to us.
