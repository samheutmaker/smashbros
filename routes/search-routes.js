const cabellas = require('./../lib/clients/cabellas');
const rei = require('./../lib/clients/rei');
const dicks = require('./../lib/clients/dicks');

module.exports = exports = function searchHandler(req, res) {
  let searchQuery = req.query.searchQuery
  let queries = [
    cabellas.search(searchQuery),
    rei.search(searchQuery),
    dicks.search(searchQuery)
  ];

  Promise.all(queries)
    .then((response) => {
      response = mergeArrays(response);
      return res.status(200).json(response);
    })
    .catch(err => console.error(err));
}


function mergeArrays(arrays) {
  let results = [];
  let maxLength = Math.max(...arrays.map(a => a.length));
  for(let i = 0; i < maxLength; i++) {
    arrays.forEach((array) => {
      if(array[i]) {
        results.push(array[i])
      };
    })
  }
  return results;
}