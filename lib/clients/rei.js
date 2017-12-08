const { GET, buildLink } = require('./../Request')
const json = require('./../JsonResponse');

class REI {
  constructor(props) {
    this.url = 'https://www.rei.com/rest/search/results';
    this.baseParams = {
      page: 1,
      pageSize: 30,
    };
  }
  getParams(searchQuery) {
    return {
      ...this.baseParams,
      q: searchQuery,
      ir: `q:${searchQuery}`
    }
  }
  getSearchUrl(params) {
    return buildLink(this.url, this.getParams(params));
  }
  request(searchQuery) {
    return GET(this.url, this.getParams(searchQuery))
    .then(json)
    .then(res => {
      return res.results;
    })
    .catch(err => console.error(err));
  }
  cleanData(items) {
    return items.map((item) => {
      return {
        title: item.brand + ' ' + item.cleanTitle,
        link: 'https://www.rei.com' + item.link,
        cost: item.displayPrice.priceDisplay.price,
        imageSrc: item.thumbnailImageLink,
        seller: 'REI'
      };
    });
  }
  search(searchQuery){
    return this.request(searchQuery)
    .then(res => {
      return this.cleanData(res);
    })
    .catch(err => {
      console.error(err);
      return Promise.reject();
    });
  }

}

module.exports = exports = new REI();