import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './store/actions';
import $ from 'jquery';

import Spinner from 'react-spinkit';
import Navigation from './components/navigation';
import TitleCard from './components/title-card';
import Row from './components/row';
import Footer from './components/footer';
import SearchOverlay from './components/search-overlay';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			showSearch: false
		}
	}

	render() {
		return (
			<div className="app">
				<Navigation cb={this.handleUserKeypress.bind(this)} />
				<Spinner spinnerName="wave" className="main-spinner" />
				{ this.props.loading ? null : this.renderContent() }
			</div>
		);
	}

	componentWillMount() {
		setTimeout(this.props.fetchNextContent, 2000);
	}

	componentDidMount() {
		window.addEventListener('keypress', this.handleUserKeypress.bind(this));
	}

	componentWillUnmount() {
		window.removeEventListener('keypress', this.handleUserKeypress.bind(this));
	}

	handleUserKeypress(e) {
		this.setState({ showSearch: true });
		$('.search-input').focus();
	}

	searchOverlayCallback() {
		this.setState({ showSearch: false });
	}

	renderContent() {
		$('.main-spinner').addClass('spinner-is-faded');
		if (!this.state.showSearch) {
			return (
				<section>
					<TitleCard featured={this.props.content['movie/popular'][0]} />
					{this.renderRows()}
					<Footer />
				</section>
			);
		} else {
			return (
				<SearchOverlay cb={() => this.setState({ showSearch: false })} />
			);
		}
	}

	renderRows() {
		let rows = [];
		for (let key in this.props.content) {
			rows.push(<Row type={key} items={this.props.content[key]} key={key} />);
		}
		return rows;
	}

}

const mapStateToProps = ({ content, loading }) => {
	return {
		content,
		loading
	}
}

export default connect(mapStateToProps, actions)(App);
