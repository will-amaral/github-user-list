// Here, we import the necessary modules for the project. The Octokit module
// is the official Github API module for Node.js
const Octokit = require('@octokit/rest');
const octokit = new Octokit({
	// Replace this string with your own token. You can do it at
	// https://github.com/settings/tokens
	auth: 'token MY GITHUB TOKEN'
});
const cors = require('cors');
const app = require('express')();

// To modularize our proxy API, we use three different functions to 
// retrieve data from Github. For bigger applications, you can separate
// the functions in different files and import in the same way you import modules. 
const getUsers = (since) => {
	let data = octokit.users.list({since});
	return data;
};

const getUserDetails = (username) => {
	let data = octokit.users.getByUsername({username});
	return data;
};

const getUserRepos = (username) => {
	let data = octokit.repos.listForUser({username});
	return data;
}

// The CORS module stands for Cross Origin Resource Sharing
// Learn more about CORS at https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
app.use(cors());

// The endpoints for the api use the query params 
// object to pass the necessary info to our functions. 
// The result is then send as a Json object
app.get('/api/users', async (req, res) => {
	try {
		const users = await getUsers(req.query.since);
		res.json(users);
	} catch (e) {
		console.log(e);
	}
});

app.get('/api/users/:username/details', async (req, res) => {
	try {
		const user = await getUserDetails(req.params.username);
		res.json(user);
	} catch (e) {
		console.log(e);
	}
});

app.get('/api/users/:username/repos', async (req, res) => {
	try {
		const repos = await getUserRepos(req.params.username);
		res.set
		res.json(repos);
	} catch (e) {
		console.log(e);
	}
});

// Customize the server when used in production
app.listen(3001, () => {
	console.log('Server running at port 3001')
});