import { Observable } from 'rxjs';
import { combineEpics } from 'redux-observable';
import { API_KEY, ROOT_URL } from '../config';
import { corsAJAX } from '../helper-fns';
import {
	returnSelectedItem,
	returnSearchContent,
	fetchNextContent,
	returnNextContent,
	FETCH_CONTENT,
	SELECT_ITEM,
	SEARCH_CONTENT,
	SEARCH_ERROR,
	SEARCH_CANCELLED
} from './actions';

const handleSearchEpic = action$ =>
	action$.ofType(SEARCH_CONTENT)
		.mergeMap(action =>
			corsAJAX(`${ROOT_URL}/search/multi?api_key=${API_KEY}&language=en-US&query=${action.query}`, 'GET')
				.map(res => res.response.results.filter(content => {
					return content.media_type !== 'person';
				}))
				.map(res => returnSearchContent(res))
				.takeUntil(action$.ofType(SEARCH_CANCELLED))
				.catch(err => Observable.of({
					type: SEARCH_ERROR,
					payload: err.xhr.response,
					error: true
				}))
		);

const selectItemEpic = action$ =>
	action$.ofType(SELECT_ITEM)
		.mergeMap(action =>
			Observable.forkJoin(
				corsAJAX(`${ROOT_URL}/${action.item.type}/${action.item.id}?api_key=${API_KEY}&language=en-US`, 'GET'),
				corsAJAX(`${ROOT_URL}/${action.item.type}/${action.item.id}/videos?api_key=${API_KEY}&language=en-US`, 'GET')
			)
			.map(res => returnSelectedItem({ ...res[0].response, ...res[1].response }, action.activeRow))
			.do(() => action.cb())
			.takeUntil(action$.ofType(SELECT_ITEM))
		);

const topChartsCategories = ['movie/popular', 'movie/upcoming', 'tv/popular', 'tv/top_rated'];
const genreNames = { action: 28, comedy: 35, drama: 18, horror: 27, 'science fiction': 878, thriller: 53, mystery: 9648 };

// fetchContentEpic helper function
const buildUrls = () => {
	let promises = [];
	let tags = [];

	topChartsCategories.forEach(category => {
		promises.push(corsAJAX(`${ROOT_URL}/${category}?api_key=${API_KEY}&language=en-US&page=1`, 'GET'));
		tags.push(category);
	});

	for (let val in genreNames) {
		promises.push(corsAJAX(`${ROOT_URL}/discover/movie?api_key=${API_KEY}&language=en-US&1sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${genreNames[val]}`, 'GET'));
		tags.push(val);
	};
	return [ promises, tags ];
}

const fetchNextContentEpic = action$ =>
	action$.ofType(FETCH_CONTENT)
		.flatMap(action =>
			Observable.forkJoin(buildUrls()[0])
			.map(res => {
				let tags = buildUrls()[1];
				let filteredResults = {}
				res.forEach((el, idx) => {
					filteredResults[tags[idx]] = el.response.results;
				});
				return filteredResults;
			})
			.map(filteredResults => returnNextContent(filteredResults))
		);

export const rootEpic = combineEpics(
	handleSearchEpic,
	selectItemEpic,
	fetchNextContentEpic
);
