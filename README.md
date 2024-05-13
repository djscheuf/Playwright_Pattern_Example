# Playwright_Pattern_Example
Example Playwright Repository demonstrating Test-Context-POM Pattern. 

This repo houses several examples of the Test-Context-POM Automation pattern in playwright. It is intended to be used as a working example paired with a training on the use of the pattern. 

## Setup For Training
Please follow the steps in [Setup Guide](./doc/setup.md) to setup your local to be ready to follow the accompanying trainiong.

## Examples
### Out-Of-The-Box
When you Init Playwright, it provides some out of the box examples. This spec shows how the out of the box pattern might be refactored into the TC-POM form.
The supporting Context and POM can be found in the respective folders, under the `out-of-the-box` name.

You can see the steps taken to refactor from the stock PW Test examples towards the recoomended GWT Test-Context-POM style in the `feat/out-of-the-box` branch and [PR#2](https://github.com/djscheuf/Playwright_Pattern_Example/pull/2)


### Journeyman
The Journeyman examples are executed on the 'A Journeyman's Travels' Blog. The sequence of commits will demonstract a more natural test development flow, starting with a GWT test case. 

See the `feat/journeyman` branch for commit sequences.
