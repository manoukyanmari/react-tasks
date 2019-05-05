export const FETCH_CONTENT         = 'FETCH_CONTENT';
export const SELECT_ITEM           = 'SELECT_ITEM';
export const LOAD_CONTENT          = 'LOAD_CONTENT';
export const SEARCH_CONTENT        = 'SEARCH_CONTENT';

// Epics Actions
export const RETURN_SELECTED_ITEM  = 'RETURN_SELECTED_ITEM';
export const RETURN_SEARCH_CONTENT = 'RETURN_SEARCH_CONTENT';
export const RETURN_CONTENT        = 'RETURN_CONTENT';
export const SEARCH_CANCELLED      = 'SEARCH_CANCELLED';
export const SEARCH_ERROR          = 'SEARCH_ERROR';

export const selectItem = (item, activeRow, cb) => ({ type: SELECT_ITEM, item, activeRow, cb });

export const returnSelectedItem = (selectedItem, activeRow) =>
	dispatch =>
		dispatch({
			type: RETURN_SELECTED_ITEM,
			selectedItem,
			activeRow
		});

export const loadContent = () =>
	dispatch =>
		dispatch({
			type: LOAD_CONTENT,
			loading: true
		});

export const searchContent = query => ({ type: SEARCH_CONTENT, query });

export const searchCancelled = () =>
	dispatch =>
		dispatch({
			type: SEARCH_CANCELLED,
			searchResults: []
		});

export const returnSearchContent = searchResults =>
	dispatch =>
		dispatch({
			type: RETURN_SEARCH_CONTENT,
			searchResults
		});

export const fetchNextContent = () => ({ type: FETCH_CONTENT });

export const returnNextContent = content =>
	dispatch =>
		dispatch({
			type: RETURN_CONTENT,
			content
		});
