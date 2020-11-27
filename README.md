# Graphy Backend Coding Challenge


## Running Locally
`npm run dev` will run the express application locally and watch for changes made in the `src` typescript folder.

If you are using vscode, enable auto attach node process to make use of the vscode javascript debugger. You can do that with `command + shift + p` and selecting `Debug: Toggle Auto Attach`.


## Description of Solution

## Reasoning Behind Technical Choices
I love to build things as tiny lambda functions that can individually scale as needed, but running these locally can be trickier and the benefits of this architecture neither outweighted the negatives nor contributed to solving the challenge at hand.

Express architecture is based off of [bulletproof nodejs](https://softwareontheroad.com/ideal-nodejs-project-structure/) ideas for route organisation.

## Trade-offs I Made or Anything I Left Out

## What I Did Differently

## What I Would Do Differently If I Were to Spend More Time On This
- add a more sophisticated logger, for example winston, or if using GCP their logging client