'use strict';

var Yelp = require('yelp');

var yelp = new Yelp({
  consumer_key: process.env.YELP_CONSUMER_KEY,
  consumer_secret: process.env.YELP_CONSUMER_SECRET,
  token: process.env.YELP_TOKEN,
  token_secret: process.env.YELP_TOKEN_SECRET,
});

exports.getResults = function(coordObj, callback) {
  console.log('coordObj:', coordObj)
  yelp.search({
    offset: coordObj.count,
    limit: 20,
    radius_filter: coordObj.radius,
    term: 'restaurants',
    ll: `${coordObj.lat},${coordObj.lng}`,
    category_filter: coordObj.category
  })
  .then(function(data) {
    callback(null, data);
  })
  .catch(function(err) {
    callback(err);
  })
}
