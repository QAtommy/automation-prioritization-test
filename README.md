## PLAYWRIGHT E2E TEST SETUP

### Prerequisites 

- Node.js version 20.16.0 or [later](https://nodejs.org/en/download)
- Playwright + Playwright browsers
- Not required but highly recommended:
   - VS Code
   - GitHub Copilot (VS Code extension)
   - Playwright Test for VSCode (VS Code Extension)
   - ESLint and Prettier extensions

### Installing & running tests 

- Install playwright with OS dependencies:
`npx playwright install --with-deps` (this can also be done easily via the Playwright Test extension)

- Install other necessary packages:
`run install`

- How to run tests tests (headless mode by default): 
`npm test` - runs tests on all browsers (Chromium, Firefox and Webkit)
`npm test:firefox` - runs all tests on a specific browser

### AI Test Creation

To assist with creating automated test cases & page object models, you can utilize the following playwright-test subagents:
`.github\agents\playwright-test-generator.agent.md`
`.github\agents\playwright-test-healer.agent.md`
`.github\agents\playwright-test-planner.agent.md`

These definitions should be regenerated whenever Playwright is updated.
For VSCode in particular, you can run the following command to do this:
`npx playwright init-agents --loop=vscode` - more details can be found [here](https://playwright.dev/docs/test-agents#getting-started)

These are used with the `playwright-test` mcp server

Here's an example on how to do this using VSCode with the Copilot extension:

1. Edit `tests\seed.spec.ts` to point to the page where you would like to generate a POM / begin the test flow from.
note: `auth-setup.ts` (being a dependancy for all projects) will always run first, so any necessary accounts will already be logged into
2. Open the Copilot chat, and select the Agent -> choose one of the `playwright-test` agents.
3. Using the prompt, specify the test flow and/or desired page object to create.
note: you may have to allow full access to the MCP server's tool to allow for a less interrupted LLM test generation experience


