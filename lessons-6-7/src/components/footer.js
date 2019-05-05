import React from 'react';

const Footer = () => {

	return (
		<section className="footer">
			<section className="footer-container">
				<section className="footer-section">
					<a href="https://github.com/josectello/getflix" target="_blank"><i className="fa fa-github" aria-hidden="true"></i></a>
					<i className="fa fa-facebook-official" aria-hidden="true"></i>
					<i className="fa fa-twitter" aria-hidden="true"></i>
					<i className="fa fa-instagram" aria-hidden="true"></i>
				</section>
				<section className="footer-section">
					<p className="footer-label"><a href="#">ABOUT</a></p>
					<p className="footer-label"><a href="#">IMDB</a></p>
				</section>
				<section className="footer-section">
					<p className="footer-label"><a href="#">NETFLIX</a></p>
					<p className="footer-label"><a href="#">THE MOVIE DB</a></p>
				</section>
				<section className="footer-section">
					<p className="footer-label"><a href="#">REACT</a></p>
					<p className="footer-label"><a href="#">REDUX</a></p>
				</section>
			</section>
		</section>
	);
}

export default Footer;
