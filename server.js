const express = require('express')
const next = require('next')
const dev = process.env.NODE_ENV !== 'production'
const port = process.env.PORT || 3000
const app = next({
  dir: '.',
  dev: dev
});
const handle = app.getRequestHandler()
const jsonParser = require('body-parser').json();
const searchHandler = require('./routes/search-routes');

app.prepare()
  .then(() => {
    const server = express()

    server.get('/api/search', jsonParser, searchHandler);

    server.get('*', (req, res) => {
      return handle(req, res)
    })

    server.listen(port, (err) => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${port}`)
    })
  });