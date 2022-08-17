# infernode

Flamegraph tool for node.js

## Usage

Coming soon...

## Developing

1. Clone this repository
1. `npm install` in the repo directory
1. `npm run dev` to run the server with on-save recompile/reload

## Architecture

### Backend Tech Stack

- TypeScript
- Node.js
- Express.js
- SQLite3
- Jest

### Frontend Tech Stack

- TypeScript
- React
- React-Router
- React-Bootstrap

### High Level Diagram

![infernode architecture diagram](/docs/images/app-diagram.png)

## Interface

### Overview

![ui overview](/docs/images/layout-overview.png)

### General Page Layout

![generic page layout](/docs/images/layout-draft.png)

### Page Wireframes
![history page](/docs/images/history-page.png)
![capture page](/docs/images/capture-page.png)
![manage page](/docs/images/manage-page.png)
![help page](/docs/images/help-page.png)

## Contributing

See [this page](https://www.freecodecamp.org/news/writing-good-commit-messages-a-practical-guide/) for general best practices.

### Commit Messages

- Start with capital letter
- No period
- Imperative and present tense
- Descriptive of outcome
- Short (less than 72 characters)
- For working branch commits, first line is sufficient

### Pull Requests

- Update working branch and test with most recent code before PRing
- PR title should take the form of a commit message title
- Body of PR should take the form of a full commit message body
- Once approved, the PR author is responsible for squash merging into the destination branch
- Branches should be deleted after merge

### Branch Names

- Use a new branch for each new feature and eventual PR
- Use the format of "type/descriptive-outcome"
- Types include:
  - bugfix
  - feature
  - docs
  - testing
- The descriptive-outcome should describe what will be achieved by merging the branch
  