# Website IP Address Tracker

This is a simple React webpage to show the implementation of 3 functions: `requestHandled`, `top100`, and `clear`. `top100` is automatically called when the webpage loads and displays the top 100 unique ip addresses.

A "Generate Random Data" button is provided to generate 1,000,000 "quazi" ip addresses (abbreviated addresses in order to generate more duplicates). This button callso `requestHandled` for each ip address. A "Clear Data" button is also provided to call the `clear` method.

_Note: this would not be ideal for a production environment because it can't be called from another program, but this was a simple way to implement a progrem that caches ip addresses in memory. The same general implementation could be used in a backend service._

### requestHandled(ipAddress)

This function accepts a string containing an IP address like “145.87.2.109”. This function will be called by the web service every time it handles a request. The calling code is outside the scope of this project. Since it is being called very often, this function needs to have a fast runtime.

### top100()

This function should return the top 100 IP addresses by request count, with the highest traffic IP address first. This function also needs to have a fast runtime. Imagine it needs to provide a quick response to display on a dashboard.

### clear()

Called at the start of each day to forget about all IP addresses and tallies.

## Useful commands

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

In the project directory, you can run:

### `yarn`

Downloads all dependencies for the project.

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
