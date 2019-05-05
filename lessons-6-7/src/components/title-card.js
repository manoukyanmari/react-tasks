import React, { Component } from 'react';
import { formatYear, formatReview } from '../helper-fns';
import StarRatingComponent from 'react-star-rating-component';
import getColors from 'get-image-colors';
import tinycolor2 from 'tinycolor2';

class TitleCard extends Component {
	constructor(props) {
		super(props);

		this.state = {
			background: ''
		}
	}

	render() {
		const styles = {
			background: this.state.background,
			backgroundSize: 'cover'
		}

		return (
			<section className="title-card" style={styles}>
				<section className="card-img">
					<img src={`https://image.tmdb.org/t/p/w300/${this.props.featured.poster_path}`}
						alt="Title Card" />
					<div className="card-img-overlay"></div>
				</section>
				<article className="card-body">
					<h1 className="title-card-header">{this.props.featured.title} ({formatYear(this.props.featured.release_date)})</h1>
						<StarRatingComponent
							name="item-review"
							className="item-review"
							value={formatReview(this.props.featured.vote_average)}
							starCount={5} />
					<p>{this.props.featured.overview}</p>
				</article>
			</section>
		);
	}

	componentWillMount() {
		const backdropUrl = `https://image.tmdb.org/t/p/original${this.props.featured.backdrop_path}`;
		const posterUrl = `https://image.tmdb.org/t/p/w300/${this.props.featured.poster_path}`;
		const generateBackdrop = new Promise((resolve, reject) => {
			// fetches main colors from backdrop, checks if brightness is low enough for contrast, resolves Promise
			getColors(posterUrl).then(colors => {
				colors.forEach((color, idx) => {
					const evalColor = tinycolor2(color.alpha(1).css());
					if (evalColor.getBrightness() < 170) {
						const backdrop = colors[idx].alpha(0.9).css();
						resolve(`linear-gradient(${backdrop}, ${backdrop}, rgba(20, 20, 20, 1)), url(${backdropUrl}) no-repeat center`);
					}
				});
			});
		});
		generateBackdrop.then(res => { this.setState({ background: res }); });
	}
}

export default TitleCard;
