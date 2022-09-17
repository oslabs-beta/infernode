# infernode

A process tracing and flame graph tool for node.js development

![build tests](https://github.com/oslabs-beta/infernode/actions/workflows/node.js.yml/badge.svg)
![website deployment](https://github.com/oslabs-beta/infernode/actions/workflows/pages.yml/badge.svg)
![publishing to npmjs.com](https://github.com/oslabs-beta/infernode/actions/workflows/publish.yml/badge.svg)

[INFERNOde NPM Package](https://www.npmjs.com/package/infernode)

[INFERNOde Website](https://www.infernode.dev)

[Documentation and Features](https://www.infernode.dev/Documentation/doc2.html)

[Contact the developers](mailto:team@infernode.dev)

## Usage

0. Ensure that your user account has sufficient permissions to perform process tracing on your system.

On Mac:
```
echo "$(whoami) ALL=(ALL) NOPASSWD: /usr/sbin/dtrace" | sudo tee -a /etc/sudoers
```
On Linux:
```
echo "kernel.perf_event_paranoid=-1" | sudo tee -a /etc/sysctl.conf > /dev/null
sysctl -p
```
1. `npm install --save-dev infernode` in your Node.JS NPM project
1. `npx infernode` to launch INFERNOde
1. Navigate to the **Capture** page
1. Provide the path to your app's entrypoint, relative to the top level directory of your project (e.g. `src/index.js`)
1. Set a time limit for your capture and hit start
1. If necessary, interact with your app to trigger the functionality you want to trace
1. Check out the new flame graph in the sidebar

## Interface

<a href="docs/images/infernode-history-page.png"><figure><img src="docs/images/thumbs/infernode-history-page.png">
<figcaption>View and Manage Existing Graphs</figcaption></figure></a>

<a href="docs/images/infernode-diff-page.png"><figure><img src="docs/images/thumbs/infernode-diff-page.png">
<figcaption>Generate Differential Graphs</figcaption></figure></a>

<a href="docs/images/infernode-basic-capture-page.png"><figure><img src="docs/images/thumbs/infernode-basic-capture-page.png">
<figcaption>One-click Captures</figcaption></figure></a>

<a href="docs/images/infernode-advanced-capture-page.png"><figure><img src="docs/images/thumbs/infernode-advanced-capture-page.png">
<figcaption>Flexible Capture Settings</figcaption></figure></a>

<a href="docs/images/infernode-upload-page.png"><figure><img src="docs/images/thumbs/infernode-upload-page.png">
<figcaption>Upload Existing `perf` Files</figcaption></figure></a>

<a href="docs/images/infernode-help-page.png"><figure><img src="docs/images/thumbs/infernode-help-page.png">
<figcaption>In-app Help</figcaption></figure></a>

## Architecture

[Diagrams](docs/arch-diagrams.md)

### Key Dependencies

#### Backend

- TypeScript
- Node.js
- Express.js
- SQLite3
- Pino
- Formidable

#### Frontend

- TypeScript
- React
- React-Router
- React-Bootstrap
- Axios

#### CI/CD

- Github Actions
- Jest
- Supertest
- Semantic-Release
- Stylelint
- ESLint
- Webpack


## Developing

1. Clone this repository
1. `npm install` in the repo directory
1. `npm run dev` to run the server with on-save recompile/reload

### Additional project scripts

All scripts are accessible via `npm run <scriptname>`, some key scripts are:

- `resetdb`: Clean out infernode's datastore for a fresh start
- `clean`: Remove all contents of the `./dist/` directory
- `copy-assets`:  Copy static assets from `./src/` to `./dist/`
- `lint`:  Run linter (ESLint) against the relevant client and server source code
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

Please see [CONTRIBUTING.md](CONTRIBUTING.md) for standards and process related to contributing to this project.
