# Playwright Training Setup Guide

## Intent
This document lists basic steps to setup your local machine to follow along with the upcoming Playwright Training based on the Playwright Pattern Example .

## Steps
1.	Clone the Pattern Repo from https://github.com/djscheuf/Playwright_Pattern_Example
2.	Move into the Repo Directory
3.	Run `npm i`, this will install the repo’s current dependencies.
4.	Run `npm run prepare`, this will install the playwright Chromium browser dependency.
5.	Run `npm run setup`, this will leverage the playwright init scripts to setup comparison examples for future use. 
    1.	When prompted, select TypeScript
    2.	Use the default end to end tests, `e2e` which will not affect the other examples in this repo.
    3.	Do not add Github Actions
    4.	Do NOT install playwright browsers, you’ve already accomplished this.
    5.	Do NOT override the existing playwright config.

## Confirmation
Upon completing the setup, please confirm you are properly setup by invoking the following:
`npm run ootb`. This will invoke the example repo’s ‘Out of The Box’ test suite, and attempt to run them on your local. 

If this suite passes, your setup is complete. 

If you receive errors regarding a browser dependency, try re-running `npm run prepare`.

If you receive an error in a particular test, but NOT all tests fail, and it is not a ‘timeout’ error, then your setup has worked and instead the examples may have become stale. 
