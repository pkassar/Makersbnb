const usersController = require('../controllers').users;
const listingsController = require('../controllers').listings;
const path = require('path');

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Users API!',
  }));

  app.get('/signup', function(req, res) {
    res.render(path.resolve('views/index.html'), {
      string: 'random_value',
      other: 'value'
    });
});

  app.get('/home', function(req, res) {
    res.render(path.resolve('views/home.html'));
  });

  app.post("/api/users", function(req, res) {
    'debugger';
    usersController.create
    .then(function (req, res) {
      res.render(path.resolve('views/index.html'))
    });
  });

  app.get('/api/users', usersController.list);
  app.get('/api/users/:listing', usersController.retrieve);
  app.put('/api/users/:userId', usersController.update);
  app.delete('/api/users/:userId', usersController.destroy);

  app.post('/api/users/:userId/items', listingsController.create);
  app.put('/api/users/:userId/items/:listingId', listingsController.update);
  app.delete(
    '/api/users/:userId/items/:listingId', listingsController.destroy
  );
  app.all('/api/users/:userId/items', (req, res) => res.status(405).send({
    message: 'Method Not Allowed',
  }));
};
