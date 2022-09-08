# infernode

Flamegraph tool for node.js

![build tests](https://github.com/oslabs-beta/infernode/actions/workflows/node.js.yml/badge.svg)
![website deployment](https://github.com/oslabs-beta/infernode/actions/workflows/pages.yml/badge.svg)

Current release: 1.0.0

[Contact the developers](mailto:team@infernode.dev)

## Usage

Coming soon...

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

## Developing

1. Clone this repository
1. `npm install` in the repo directory
1. `npm run dev` to run the server with on-save recompile/reload

### Additional project scripts

All scripts are accessible via `npm run <scriptname>`.

- `clean`: Remove all contents of the `./dist/` directory
- `copy-assets`:  Copy static assets from `./src/` to `./dist/`
- `lint`:  Run linter (ESLint) against the relevant client and server source code
- `prebuild`: Sequentially runs `lint`, `clean`, and `copy-assets` prior to all `build`s
- `tsc`: Performs TypeScript transpilation for the server project
- `build`: Performs `npm run prebuild`, `npm run tsc`, and `npm run webpack` sequentially, will halt if any `prebuild` steps have non-zero exit codes
- `test`: Performs a fresh `build` and then executes all test suites
- `start`: Starts the `node` server in production mode, access via <http://localhost:3000>
- `dev`: Starts the `node` and `webpack-dev-server` servers in development mode, both dynamically recompiling/bundling/restarting on source code changes, access via <http://localhost:8080>

### Express.js Global Error Handler

- Invoked via `next( errObject: InfernodeError )`.
- Takes an `InfernodeError` type object with the following mandatory properties:
  - `message: string`: A technical error message not necessarily intended for end users
- The `InfernodeError` object can optionally include:
  - `userMessage: string`: A non-technical error message intended for (public) end users or API consumers
  - `httpStatus: number`: A more specific HTTP status code to use for the response
  - `controller: string`: The Express middleware controller/function/method/operation that caused the error
- Logs the entire error object + the request method and path to the server's console.
- The response status will be set to 500 by default if an `errObject.httpStatus` code is not provided.
- In development mode, entire error object, request method, and request path will be sent in the HTTP response body as JSON.
- In production mode, only the errObject.userMessage will be sent in the HTTP response body as JSON.

## Contributing

### Commit Messages

Infernode now uses [Semantic-Release](https://github.com/semantic-release/semantic-release/blob/master/README.md) and [Commitizen](https://github.com/commitizen/cz-cli/blob/master/README.md) to automatically handle versioning. As a result, instead of using ```git commit``` when making a commit, it is important to use ```npm run commit``` to comply with formatting implemented by Semantic-Release. Commitizen will walk the user through how to author commit messages in the command line.
### Pull Requests

- Development should be performed on branches from `dev` and PR'd back to `dev` once complete,
- Releases will be performed by PRing to `main`.
- Pull Requests to `dev` and `main` are blocked on passing GHA checks. In order to ensure your PR will pass checks, make sure that:
  - All new dependencies have been included in package.json/package-lock.json
  - All tests are passing locally via `npm test`
  - All ESLint checks pass locally via `npm run lint`
  - A new build is successful locally via `npm run build`
  - The app is functional in production mode via `npm run build && npm start` and browsing to <http://localhost:3000>

Please consider the following when filing pull requests:

- Update working branch from dev
- Test the above GHA check criteria locally
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
  - refactor
- The descriptive-outcome should describe what will be achieved by merging the branch
  
