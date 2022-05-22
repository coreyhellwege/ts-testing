<div id="top"></div>

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]

<br />

<h1 align="center">Test Driven Development with TypeScript & Jest</h1>
  <p align="center">
    Learning about unit testing with NodeJs, Typescript, Jest and React.
  </p>
  <br />
</div>

<br />

Testing improves code quality, reliability and maintainability.
Catch bugs early, during development.

The typical process is to first write the test and then create the implementation. 

### Unit Tests: 

Tests small, specific parts of the codebase. Run often. Should be independent from each other.

### Integration Tests:

Tests whether multiple parts of the application work together correctly.

### End-to-end Tests:

Tests from the frontend to the backend. Usually mimics how a user would navigate the application in the UI.

<br />

# Jest Notes:

When writing unit tests:
- use `.toBe()` for comparing primitive values (e.g strings, numbers etc).
- use `.toEqual()` for comparing objects.

### [Useful Global Methods](https://jest-bot.github.io/jest/docs/api.html):

`test.only` - Only run <i>this</i> or <i>these</i> tests.

### Test coverage:

The `collectCoverage` [Jest option](https://github.com/facebook/jest/blob/main/docs/Configuration.md#collectcoverage-boolean) generates a test coverage report each time your tests run.

## Mocks & Stubs:

<b>Mocks</b> and Stubs are imitation versions of attributes in your code for the purpose of testing.

Mocks represent or imitate more complex parts of your code (usually functions) in your tests so you’re able to test wider functionality. Mocks are used to evaluate behaviour. I.e your tests usually run through mocks.

<b>Stubs</b> are hard-coded imitations of certain values (usually objects) in your tests.  
Stubs are used to validate state. I.e stubs ensure the state of your tests are setup to run smoothly.

### [NeDB](https://www.npmjs.com/package/nedb):

Embedded persistent or in memory database for Node.js
Just using this for the purpose of running these example tests.


<br />

<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* [Alex Horea](https://www.udemy.com/course/unit-testing-typescript-nodejs/)

<p align="right"><a href="#top">back to top</a></p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/coreyhellwege/ts-testing.svg?style=for-the-badge
[contributors-url]: https://github.com/coreyhellwege/ts-testing/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/coreyhellwege/ts-testing.svg?style=for-the-badge
[forks-url]: https://github.com/coreyhellwege/ts-testing/network/members
[stars-shield]: https://img.shields.io/github/stars/coreyhellwege/ts-testing.svg?style=for-the-badge
[stars-url]: https://github.com/coreyhellwege/ts-testing/stargazers
[issues-shield]: https://img.shields.io/github/issues/coreyhellwege/ts-testing.svg?style=for-the-badge
[issues-url]: https://github.com/coreyhellwege/ts-testing/issues