import React from 'react';
import styled from 'styled-components';

const Card = ({ metadata, type, cb }) => {
	// leveraging `styled-components` library exclusively here to pass image path down as props
	const Section = styled.section`
		width: 200px;
		height: 330px;
		margin-right: .6em;
		flex: 0 0 auto;
		background-size: contain !important;
		transition: all .2s ease-in-out;
		${(props) => `background: url(https://image.tmdb.org/t/p/w300/${props.path}) no-repeat center;`}
		&:hover {
			cursor: pointer;
			transform: scale(1.15);
			margin: 0 26px 0 14px;
			${(props) => `background: linear-gradient(rgba(20,20,20, .3), rgba(20,20,20, .5)), url(https://image.tmdb.org/t/p/w300/${props.path}) no-repeat center`}
		}`;

	let itemType;
	itemType = type.indexOf('/') === -1 ? { type: 'movie' } : { type: type.slice(0, type.indexOf('/')) };
	const item = { ...itemType, ...metadata };

	return (
		<Section className="card"
						 onClick={cb.bind(null, item)}
						 path={metadata.poster_path}>
		</Section>
	);
}

export default Card;
