import React, { Component } from 'react';


class UserDetail extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoading: true
		};
	}

	componentDidMount() {
		this.loadUser();
		this.loadRepositories();
	}

	loadUser() {
		fetch(`http://localhost:3001/api/users/${this.props.login}/details`)
		.then(res => res.json())
		.then(res => {
			this.setState({
				id: res.data.id,
				login: res.data.login,
				profile: res.data.html_url,
				date: res.data.created_at,
				avatar: res.data.avatar_url,
				name: res.data.name
			})
		})
	}

	loadRepositories() {
		fetch(`http://localhost:3001/api/users/${this.props.login}/repos`)
		.then(res => res.json())
		.then(res => {
			this.setState({
				repos: res.data,
				isLoading: false
			})
		});	
	}

	render() {
		if (this.state.isLoading) {
      return (
				<div className="loader-container">
					<div className="loader"></div>
				</div>
      )
    }

		const repo = this.state.repos.map((repo)=>{
			return (
				<tr key={repo.id}>
					<td>{repo.id}</td>
					<td>{repo.name}</td>
					<td><a href={repo.html_url}>{repo.html_url}</a></td>
				</tr>
			)
		})

		return (
			<section className="section">
				<div className="container">
					<div className="row columns">
						<div className="column">
							<button className="button" onClick={() => this.props.returnNull(null)}>Return</button>
						</div>
					</div>
					<div className="row columns">
						<div className="column is-one-third">
							<figure className="image is-1by1">
								<img src={this.state.avatar} alt="Avatar"/>
							</figure>
						</div>
						<div className="column">
							<p className="subtitle is-4">@{this.state.login}</p>
							<p className="title is-1">{this.state.name}</p>
							<p className="subtitle is-6 is-spaced">User Id:{this.state.id}</p>
							<p className="title is-5">profile: <a href={this.state.profile}>{this.state.profile}</a></p>
							<p className="subtitle is-6">Created at: {new Intl.DateTimeFormat('en-US', { 
																													    year: 'numeric', 
																													    month: 'long', 
																													    day: '2-digit' 
																													}).format(new Date(this.state.date))}</p>
						</div>
					</div>
					<h1 className="title">Repositories</h1>
					<div className="row columns column table-wrapper">
						<table className="table is-fullwidth">
							<thead>
								<tr>
									<th>ID</th>
									<th>Name</th>
									<th>URL</th>
								</tr>
							</thead>
							<tbody>
								{repo}
							</tbody>
						</table>
					</div>
				</div>
			</section>
			);
		}
}

export default UserDetail;