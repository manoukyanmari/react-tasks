// HELPER FUNCTIONS
import moment from 'moment';
import { ajax } from 'rxjs/observable/dom/ajax';

export const formatYear = date => moment(date, 'YYYY/MM/DD').year();

export const formatReview = num => Math.round((num / 10) * 5);

export const corsAJAX = (url, method = method.toUpperCase()) =>
	ajax({
		url,
		method,
		crossDomain: true,
		createXHR: () => new XMLHttpRequest()
	});
