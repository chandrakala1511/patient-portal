
## Quick start

1.  Make sure that you have Node.js v8.15.1 and npm v5 or above installed.
2.  Clone this repo using `git clone --depth=1 https://github.com/chandrakala1511/patientportal.git <YOUR_PROJECT_NAME>`
3.  Move to the appropriate directory: `cd <YOUR_PROJECT_NAME>`.<br />
4.  Run `npm run setup` in order to install dependencies and clean the git repo.<br />
5.  In terminal run `json-server --watch server/jsonserver/patientdata.json  --routes server/jsonserver/routes.json --port 3001` to start the mock server
6.  In another terminal run `npm start` to see the project at `http://localhost:3000`.


