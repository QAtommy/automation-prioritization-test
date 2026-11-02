## Critical flows

### Flow #1 - Login
- Covered in: `tests\auth-setup.ts` (this is run in the auth project - so it will always be executed prior to any other tests in the project)
- Rationale: `Mission critical/high impact flow. If we cannot login using a standard account, the product is completely unusable.


### Flow #2 - Full End to End Purchase Flow
- Covered in `tests\core\purchasing-workflow.spec.ts`
- Rationale: High impact user flow. If a customer cannot add a product to their cart and complete the transcation flow, there is a large impact on their experience, and zero revenue

