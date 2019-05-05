import React, { Component } from 'react';
import { connect } from 'react-redux';
import { findDOMNode } from 'react-dom';
import $ from 'jquery';
import * as actions from '../store/actions';
import Card from './card';
import CardBody from './card-body';

class Row extends Component {

	render() {
		const className = `row-${this.props.type}`;
		const cards = this.props.items.map((el, idx) => {
			return <Card metadata={el}
									 key={idx}
									 type={this.props.type}
									 cb={this.rowCallback.bind(this)} />;
		});

		return (
			<section className={className}>
				<p className="row-title">{this.renderRowCategory()}</p>
				<section className="row-items-wrapper">
					<section className="row-body">
						{cards}
					</section>
					<span className="row-ticker"></span>
				</section>
				<section className="card-dropdown">
					{ this.props.activeRow ===	this.props.type ? <CardBody item={this.props.selectedItem} component={this.passChildComponent.bind(this)} /> : null }
				</section>
			</section>
		);
	}

	rowCallback(item) {
		if ($('.app').find('.card-dropdown.card-dropdown-is-active').length > 0) {
			$('.app').find('.card-dropdown.card-dropdown-is-active').removeClass('card-dropdown-is-active');
		}
		const cardDropdown = $(findDOMNode(this)).find('.card-dropdown');
		cardDropdown.addClass('card-dropdown-is-active');
		this.props.selectItem(item, this.props.type, () => {
				setTimeout(() => {
					const elemRect = $('.card-dropdown-is-active')[0].getBoundingClientRect();
					const top = elemRect.top + window.pageYOffset + 110;
					const middle = top - (window.innerHeight / 2);
					$('html, body').animate({ scrollTop: middle }, 500);
				}, 1000);
		});
	}

	renderRowCategory() {
		if (this.props.type.indexOf('/') === -1) {
			return this.props.type.toUpperCase();
		} else {
			let category = this.props.type.slice(this.props.type.indexOf('/') + 1).replace('_', ' ').toUpperCase();
			let type = this.props.type.slice(0, this.props.type.indexOf('/')).toUpperCase();

			type = type === 'MOVIE' ? `${type}S` : `${type} SHOWS`;

			return `${category} ${type}`;
		}
	}

	passChildComponent() {
		let { selectedItem } = this.props;
		return selectedItem.hasOwnProperty('results') && selectedItem.results.length > 0 ?
		<iframe src={`https://www.youtube.com/embed/${selectedItem.results['0'].key}`} className="item-video"></iframe> :
		<img src={`https://image.tmdb.org/t/p/w300/${selectedItem.poster_path}`} />
	}

}

const mapStateToProps = ({ selectedItem, activeRow }) => {
	return {
		selectedItem,
		activeRow
	}
};

export default connect(mapStateToProps, actions)(Row);
