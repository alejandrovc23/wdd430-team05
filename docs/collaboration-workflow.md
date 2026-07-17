# Handcrafted Haven Collaboration Workflow

This workflow keeps changes focused, reviewable, and connected to an agreed work item. Feature development should not occur directly on `main`.

## Standard Workflow

1. Clone the repository.
2. Pull the latest `main` branch.
3. Create a feature or task branch with a descriptive name.
4. Make focused changes related to one work item.
5. Run lint and build checks before sharing the work.
6. Commit with a clear message that describes the change.
7. Push the branch to GitHub.
8. Open a pull request that explains the change and its validation.
9. Request a review from a teammate.
10. Address review comments and rerun relevant checks.
11. Merge only after approval and successful required checks.
12. Delete completed local and remote branches when appropriate.

## Branch Example

```powershell
git switch main
git pull --ff-only origin main
git switch -c feature/product-card
```

Branch names should communicate their purpose, such as `feature/product-card`, `fix/navigation-focus`, or `docs/project-scope`.

## Commit and Push Example

```powershell
git add .
git commit -m "feat: add reusable product card"
git push -u origin feature/product-card
```

Before committing, review `git status` and the staged diff so unrelated files, generated output, environment files, and credentials are not included.

## Commit Prefixes

- `feat:` adds user-facing functionality.
- `fix:` corrects a defect.
- `docs:` changes documentation only.
- `style:` changes formatting or presentation without changing behavior.
- `refactor:` restructures code without changing its intended behavior.
- `test:` adds or updates tests.
- `chore:` performs maintenance or project-configuration work.

Commit messages should be concise, use the imperative mood, and describe one coherent change.

## Pull Requests and Review

Each pull request should reference its work item, summarize the implementation, identify any known limitations, and list the validation performed. The author should request a teammate review and respond to every actionable comment. Reviewers should check scope, behavior, accessibility, responsive design, maintainability, and validation results before approval.

## Individual Contributions

Each team member must contribute their own work and commits. Team members must not create commits under another person's identity or claim work they did not perform. Pairing and group discussion are encouraged, but commit history and pull-request descriptions should accurately reflect individual contributions.
