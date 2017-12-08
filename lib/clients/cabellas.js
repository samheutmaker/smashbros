const {
  buildLink
} = require('./../Request')
const Xray = require('x-ray');
const x = Xray();


class Cabellas {
  constructor(props) {
    this.url = 'http://www.cabelas.com/browse.cmd';
    this.baseParams = {
      categoryId: '734095080'
    };
  }
  getParams(searchQuery) {
    return {
      ...this.baseParams,
      CQ_search: searchQuery
    }
  }
  getSearchUrl(params) {
    return buildLink(this.url, this.getParams(params));
  }
  request(searchQuery) {
    return new Promise((resolve, reject) => {
      x(this.getSearchUrl(searchQuery), '.productItem', [{
          title: '.productContentBlock h3@text',
          link: '.productContentBlock a@href',
          cost: '.pricingBlock .itemPrice@text',
          imageSrc: '.imageBlock a img@src'
        }])((err, res) => err ? reject(err) : resolve(res));
    });
  }
  cleanData(items) {
    return items.map((item) => {
      return {
        ...item,
        cost: item.cost.replace(/^\s+|\s+$/g,''),
        seller: 'Cabella\'s'
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

module.exports = exports = new Cabellas();