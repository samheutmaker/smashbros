const {
  buildLink
} = require('./../Request')
const Xray = require('x-ray');
const x = Xray();


class DicksSportingGoods {
  constructor(props) {
    this.url = 'https://www.dickssportinggoods.com/search/SearchDisplay';
    this.baseParams = {
      beginIndex: 0,
      DSGsearchType: 'Keyword',
      pageSize: 48
    };
  }
  getParams(searchQuery) {
    return {
      ...this.baseParams,
      searchTerm: searchQuery
    }
  }
  getSearchUrl(params) {
    return buildLink(this.url, this.getParams(params));
  }
  request(searchQuery) {
    return new Promise((resolve, reject) => {
      x(this.getSearchUrl(searchQuery), '.product-grid', [{
          title: '.product-details .fplpTitle a@text',
          link: '.product-image a@href',
          cost: '.product-details .plp-price .fprice .item-price .final-price',
          imageSrc: '.product-image a img@src'
        }])((err, res) => err ? reject(err) : resolve(res));
    });
  }
  cleanData(items) {
    return items.map((item) => {
      let cost = item.cost.replace(/^\s+|\s+$/g,'');
      console.log(cost.substring(0, 4));
      if(cost.substring(0, 4) == 'NOW:') {
        cost = cost.substring(4);
      }
      return {
        ...item,
        cost: cost,
        seller: 'Dicks\'s Sporting Goods'
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

module.exports = exports = new DicksSportingGoods();