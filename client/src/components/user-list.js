import React from 'react';
import User from './user';

const UserList = (props) => {
	const users = props.users.map((user) => {
		return <User key={user.id} details={user} onSelect={props.onSelect}/>
	});

	return (
		<ul className="row columns is-multiline">
			{users}
		</ul>
	);
};

export default UserList;