import React, { Component } from 'react';
import UserList from './user-list';
import UserDetail from './user-detail';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			data: [],
			userDetail: null,
			isLoading: true,
			page: 1,
			since: 0,
		};
	}

	componentDidMount() {
		this.onLoad();
	}

	onLoad() {
		fetch(`http://localhost:3001/api/users?since=${this.state.since}`)
		.then(res => res.json())
		.then(res => {
			this.setState({data: res.data, isLoading: false})
		});
	}

	onclick(type){
    this.setState(prevState => {
       return {
       	isLoading: true,
       	page: type == 'add' ? prevState.page + 1 : prevState.page - 1,
       	since: type == 'add' ? prevState.since + 30 : prevState.since - 30,
       }
    }, () => { this.onLoad() }
    );
  }

  renderPrevious() {
  	let previous;
  	if(this.state.page > 1) {
  		previous = <button className="pagination-previous" onClick={this.onclick.bind(this, 'sub')}>Previous Page</button>
  		return previous;
  	}
  }

	render() {
		if (this.state.isLoading) {
      return (
				<div className="loader-container">
					<div className="loader"></div>
				</div>
      )
    }

    if (this.state.userDetail !== null) {
    	return <UserDetail login={this.state.userDetail} returnNull={userDetail => this.setState({ userDetail })}/>
    }

		return (
			<section className="section">
				<div className="container">
					<div className="row columns">
						<div className="column">
							<nav className="pagination is-centered" role="navigation" aria-label="pagination">
								{this.renderPrevious()}
								<button className="pagination-next" onClick={this.onclick.bind(this, 'add')}>Next Page</button>
							</nav>	
						</div>					
					</div>
					<UserList users={this.state.data} onSelect={userDetail => this.setState({ userDetail })}/>
				</div>
			</section>
		);
	}
}

export default App;