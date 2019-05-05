import {
	RETURN_CONTENT,
	LOAD_CONTENT,
	RETURN_SELECTED_ITEM,
	RETURN_SEARCH_CONTENT,
	SEARCH_CANCELLED,
	SEARCH_ERROR
} from './actions';

const initialState = {
	content: {},
	loading: true,
	searchResults: []
}

const Reducer = (state = initialState, action) => {
	switch(action.type) {
		case RETURN_CONTENT:
			return { ...state, content: action.content, loading: false };

		case RETURN_SELECTED_ITEM:
			return { ...state, selectedItem: action.selectedItem, activeRow: action.activeRow };

		case LOAD_CONTENT:
			return { ...state, loading: true };

		case RETURN_SEARCH_CONTENT:
			return { ...state, searchResults: action.searchResults };

		case SEARCH_CANCELLED:
			return { ...state, searchResults: [] };

		case SEARCH_ERROR:
			return { ...state, error: action.error };

		default:
			return state;
	}

}

export default Reducer;
