import NPECheck from '../../lib/NPECheck'
import {
  GET
} from '../../lib/Request'
import json from '../../lib/JsonResponse'

/**************************************************
 * Helpers
 **************************************************/

function set(newState) {
  return new Promise((resolve) => {
    this.setState(newState, () => resolve());
  });
}


/**************************************************
 * Misc Actions
 **************************************************/

export function getInitialState() {
  return {
    searchQuery: '',
    products: [],
    recentSearches: ['danner pronghorn size 11 boots']
  };
}




/**************************************************
 * Search Actions
 **************************************************/

export function updateSearch(searchQuery) {
  return set.call(this, {
    searchQuery
  })
}

export function updateAndSearch(searchQuery) {
  updateSearch.call(this, searchQuery)
    .then(() => search.call(this));
}

export function search() {
  let url = '/api/search';
  let searchQuery = this.state.searchQuery;
  let recentSearches = [...this.state.recentSearches];
  if (searchQuery && !recentSearches.includes(searchQuery)) {
    recentSearches = [
      ...this.state.recentSearches,
      searchQuery
    ];
  }
  return set.call(this, {
      searchXHR: true,
      recentSearches
    })
    .then(() => GET(url, {
      searchQuery
    }))
    .then(json)
    .then(res => {
      return set.call(this, {
        products: res,
        searchXHR: false,
      });
    })
    .catch(err => {
      return set.call(this, {
        searchXHR: false
      }).then(() => Promise.resolve());
    });
}

export function clearRecentSearches() {
  return set.call(this, {
    recentSearches: []
  });
}
