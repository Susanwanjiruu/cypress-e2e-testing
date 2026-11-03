# Cypress UI Automation — Automation Exercise

Cypress end-to-end tests covering user workflows on the Automation Exercise website.

The test file covers homepage visibility, account registration and deletion, invalid login feedback, product search and details, cart actions, contact form submission, product quantity, and newsletter subscription.

## Technology

- JavaScript
- Cypress
- Node.js and npm
- Automation Exercise demo website

## Repository contents

```text
.
├── automated_exercise.cy.js
└── README.md
```

The Cypress spec is currently stored at the repository root rather than Cypress's default `cypress/e2e/` directory.

## Setup

Install Node.js and npm, then initialize the project and install Cypress:

```bash
npm init -y
npm install --save-dev cypress
```

Create a `cypress.config.js` file in the repository root so Cypress discovers the existing spec:

```javascript
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    specPattern: "automated_exercise.cy.js",
  },
});
```

## Run the tests

Open the Cypress interactive runner:

```bash
npx cypress open
```

Or run the suite in headless mode:

```bash
npx cypress run
```

## Test data and behavior

Some tests create an account using a timestamp-based email address and then delete the account. Use only test data and accounts created by the test run. If a run stops before its cleanup step, check the demo account and remove any test account left behind.

The tests interact with a third-party public website. They depend on that site's availability, HTML structure, and selectors, which may change over time. A failure can therefore indicate a website change or network issue rather than a defect in Cypress itself.

## Scope and limitations

- This repository contains a UI automation exercise, not the source code for Automation Exercise.
- The tests are not evidence of a passing test run unless they have been executed and their results recorded.
- The current repository does not include a package manifest or Cypress configuration; the setup above creates the required local configuration.
