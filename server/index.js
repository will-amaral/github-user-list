const octokit = require('@octokit/rest')();
const app = require('express')();

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
		res.json(repos);
	} catch (e) {
		console.log(e);
	}
});

app.listen(3001, () => {
	console.log('Servidor na porta 3001')
});