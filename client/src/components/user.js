import React from 'react';

const User = (props) => {
	return (
		<li onClick={() => props.onSelect(props.details.login)} className="column is-half-mobile is-one-third-tablet is-one-quarter-desktop is-one-fifth-widescreen">
			<div className="card">
				<div className="card-image">
					<figure className="image is-1by1">
						<img src={props.details.avatar_url} alt="Avatar"/>
					</figure>
				</div>
				<div className="card-content">
					<div className="media">
						<div className="media-content">
							<p className="title is-4">{props.details.login}</p>
							<p className="subtitle is-6">{props.details.id}</p>
						</div>
					</div>
				</div>
			</div>
		</li>
	);
};

export default User;