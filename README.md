# Gilded Rose - JavaScript (Jest)

*Our group [project](https://github.com/masomh-personal/gilded-rose-refactor) is based on the original Gilded Rose Kata repository.*

---
## SWE-6733 | Spring (2025)
## Team 1 - Contributors

- **Connor Bland**
- **Steve Lane**
- **Masom Hamadeh**
- **Erica Ransom**
- **Baileigh Brown**

## Collaboration & Remote Pair/Mob Programming

To ensure **effective real-time collaboration** (including f-2-f), our team has chosen the following tools:

- **Discord**: Our primary tool for voice communication, screen sharing, and real-time discussions. It provides a lightweight and flexible environment for both pair programming and full-team mob programming.
- **Microsoft Teams**: Used for structured meetings, documentation sharing, and persistent threaded discussions. Teams also helps with scheduled check-ins and formal progress tracking.

### **Rationale for Our Choices**
1. **Discord** allows for quick, informal communication and is well-suited for coding sessions where screen sharing is essential.
2. **Microsoft Teams** provides structured communication and document management, which is useful for project tracking and asynchronous discussions.
3. Combining these two tools ensures a balanced workflow that supports **real-time problem-solving (Discord)** while keeping project documentation and discussions **organized and accessible (Teams).**

### **Mob Programming Video Links**
1. **YouTube:** [Concatenated FULL Video (all stages)](https://www.youtube.com/watch?v=3HydsHvKVMc)
---
## Gilded Rose in Javascript with Jest
### Below information is taken straight from official/original Gilded Rose Kata repo found
#### [Original Repo (ALL languages)](https://github.com/emilybache/GildedRose-Refactoring-Kata)

## Getting started

Install dependencies

```sh
npm install
```

## Run the unit tests from the Command-Line

To run all tests

```sh
npm test
```

To run all tests in watch mode

```sh
npm run test:watch
```

To generate test coverage report

```sh
npm run test:coverage
```

## Run the TextTest fixture from the Command-Line

For e.g. 10 days:

```
node test/texttest_fixture.js 10
```

You should make sure the command shown above works when you execute it in a terminal before trying to use TextTest (see below).


## Run the TextTest approval test that comes with this project

There are instructions in the [TextTest Readme](../texttests/README.md) for setting up TextTest. You will need to specify the Javascript-Jest executable and interpreter in [config.gr](../texttests/config.gr). Uncomment these lines:

    executable:${TEXTTEST_HOME}/js-jest/test/texttest_fixture.js
    interpreter:node
