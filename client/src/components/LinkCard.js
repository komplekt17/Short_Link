import React from 'react';

export const LinkCard = ({ link }) => {
	return (
		<div className="container">
			<h4>Current Link</h4>
			<table className="responsive-table">
				<thead>
					<tr>
						<th>Field Name</th>
						<th>Value</th>
					</tr>
				</thead>

				<tbody>
					<tr>
						<td>your link:</td>
						<td>
							<a href={link.to} target="_blank" rel="noopener noreferrer">
								{link.to}
							</a>
						</td>
					</tr>
					<tr>
						<td>from:</td>
						<td>
							<a
								href={link.from}
								target="_blank"
								rel="noopener noreferrer"
							>
								{link.from}
							</a>
						</td>
					</tr>
					<tr>
						<td>clicks:</td>
						<td>
							<strong>{link.clicks}</strong>
						</td>
					</tr>
					<tr>
						<td>create date:</td>
						<td>
							<strong>{new Date(link.date).toLocaleDateString()}</strong>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};
