import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../store/actions';
import { findDOMNode } from 'react-dom';
import $ from 'jquery';
import Row from './row';

class SearchOverlay extends Component {
	constructor(props) {
		super(props);

		this.state = {
			query: ''
		}
	}

	render() {
		return (
			<section className="search-overlay">
				<input className="search-input" onChange={(e) => this.setState({ query: e.target.value })} type="text" spellCheck="false" />
				<span className="search-subtitle"><strong>ESC </strong> key to exit.</span>
				{ this.props.searchResults.length > 0 ? <Row type={`Results for "${this.state.query}"`} items={this.props.searchResults} /> : null }
			</section>
		);
	}

	componentDidMount() {
		findDOMNode(this).addEventListener('keydown', this.unmountSearchComponent.bind(this));
	}

	componentWillUnmount() {
		findDOMNode(this).removeEventListener('keydown', this.unmountSearchComponent.bind(this));
	}

	unmountSearchComponent(e) {
		if (e.keyCode === 27) {
			this.props.searchCancelled();
			this.props.cb()
		} else if (e.keyCode === 13) {
			this.props.searchContent(this.state.query);
		}
	}
}

const mapStateToProps = ({ searchResults }) => {
	return { searchResults };
}

export default connect(mapStateToProps, actions)(SearchOverlay);
