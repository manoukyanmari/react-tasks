import React, { Component } from 'react';
import $ from 'jquery';

export default class Navigation extends Component {

	render() {
		return (
			<nav className="navigation">
				<section className="container">
					<section className="navbar-header">
						<a href="#">GETFLIX</a>
					</section>
					<section>
						<a href="#">Browse</a>
					</section>
					<section onClick={this.props.cb}>
						<a>Search</a>
					</section>
				</section>
			</nav>
		)
	}

	componentDidMount() {
		window.addEventListener('scroll', this.handleScroll);
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.handleScroll);
	}

	handleScroll() {
		if ($(window).scrollTop()) {
			$('.navigation').addClass('navigation-is-scrolled');
		} else {
			$('.navigation').removeClass('navigation-is-scrolled');
		}
	}
}
