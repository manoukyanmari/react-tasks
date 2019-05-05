import React from 'react';
import StarRatingComponent from 'react-star-rating-component'
import { formatYear, formatReview } from '../helper-fns';

import LabelStrip from './label-strip';

const CardBody = ({ item, component }) => {
	const title = item.title || item.name;
	const year = formatYear(item.release_date) || `${formatYear(item.first_air_date)}-${formatYear(item.last_air_date)}`
	let overview;
	overview = item.overview.length > 500 ? `${item.overview.substr(0, item.overview.lastIndexOf(' ', 500))}...` : item.overview;

	return (
		<section className="card-body">
			{component()}
			<section className="card-content">
				<h3 className="card-header card-child">{title} ({year})</h3>
				<StarRatingComponent
					name="item-review"
					className="item-review"
					value={formatReview(item.vote_average)}
					starCount={5} />
				<p className="card-overview card-child">{overview}</p>
				<section className="card-metadata">
					<LabelStrip labels={item.genres} />
				</section>
			</section>
		</section>
	);
}

export default CardBody;
