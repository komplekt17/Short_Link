import React from 'react';
import { Link } from 'react-router-dom';

export const LinksList = ({ links, removeClick }) => {
	if (links.length === 0) {
		return <p>Link array is empty</p>;
	}

	return (
		<table className="responsive-table">
			<thead>
				<tr>
					<th>№</th>
					<th>Short Link</th>
					<th>Full Link</th>
					<th>Clicks</th>
					<th>Date</th>
					<th>Destroy</th>
				</tr>
			</thead>

			<tbody>
				{links.map((item, index) => {
					return (
						<tr key={item._id}>
							<td>{index + 1}</td>
							<td>{item.to}</td>
							<td>{item.from}</td>
							<td>{item.clicks}</td>
							<td>{new Date(item.date).toLocaleDateString()}</td>
							<td>
								<Link to={`/detail/${item._id}`}>Details</Link> |{' '}
								<Link to={`/links`} onClick={() => removeClick(item._id)}>
									Remove
								</Link>
							</td>
						</tr>
					);
				})}
			</tbody>
		</table>
	);
};
