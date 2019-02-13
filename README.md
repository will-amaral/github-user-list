# Github Users List

Created for the Shawn and Partners test, this is a simple React+Express App that lists all users in the Github Database. It was made trying to use the least amount of npm packages possible, especially in the react size. The React portion of the app is done entirely with react, without Redux or React-Router.  

## Live App

The Express Proxy API is running in a live server at https://api.amaral.io.
The React app is live at https://will.amaral.io/gitapi

## Running it locally

#### Requirements

- [Node.js](https://nodejs.org/) (latest LTS)
- [Yarn](https://yarnpkg.com/)

#### How to run

- `git clone git@github.com:will-amaral/github-user-list`
- `yarn`

To open the project, use:

- `yarn start`

If you receive an error, update the API token in the server index.js (This is very unlikely, but since the Github API limits requests, it COULD trigger the error when overused)
