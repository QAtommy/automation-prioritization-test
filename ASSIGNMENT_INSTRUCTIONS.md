### Objective

Your assignment is to write automated test cases for an online shop, focusing on the flows you consider most critical.

### Brief

The product team at Impact has come up with a simple MVP for an online shop. Help the team get confidence in further development by identifying and automatically testing the highest-priority features of the app.

### Credentials

| Site        | URL                                |
| ----------- | ---------------------------------- |
| Online Shop | https://qa-challenge.codesubmit.io |

**Password for all users:** `secret_sauce`

### Tasks

**1. Document your test plan**

Create a `TESTPLAN.md` file that includes:

- **2–3 user flows** you consider the highest priority to test
- For each flow, explain **why** you prioritized it (P1/P2 thinking — what makes this critical?)
- **Note:** Priority should be based on user impact, functionality criticality, and risk — not on revenue or business metrics

The site supports several user accounts with different behaviors. Part of the exercise is deciding which scenarios matter most.

| User                    | Required Test Scenarios |
| ----------------------- | ----------------------- |
| standard_user           | Normal functionality |
| locked_out_user         | Login is restricted |
| problem_user            | Contains UI/data inconsistencies |
| performance_glitch_user | Exhibits performance issues |

**2. Implement automated browser tests**

Use any testing framework you prefer. We currently use Playwright internally, but you're welcome to use Cypress, Selenium, or another framework if you're more comfortable with it.

### Running Your Tests

Include a README with:

- Prerequisites (Node version, dependencies)
- How to install: `npm install`
- How to run tests: `npm test` (or equivalent)
- Tests should run in headless mode by default

### Evaluation Criteria

| Criteria                | Weight | What we look for |
| ----------------------- | ------ | ---------------- |
| Prioritization thinking | 30%    | Can you identify what matters most and explain why? |
| Test reliability        | 30%    | No flaky tests, condition-based waits, stable selectors (prefer data-test attributes) |
| Code structure          | 20%    | Page objects or similar patterns, reusable helpers, clear organization |
| Documentation           | 20%    | Clear TESTPLAN.md with prioritization rationale, README with run instructions |

### CodeSubmit

Please organize, design, test and document your code as if it were going into production — then push your changes to the default branch. After you have pushed your code, you may submit the assignment on the assignment page.

**Have fun building!** 🚀

The Impact Team
