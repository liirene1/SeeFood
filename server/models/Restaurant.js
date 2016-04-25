
'use strict';

var Yelp = require('yelp');

var yelp = new Yelp({
  consumer_key: process.env.YELP_CONSUMER_KEY,
  consumer_secret: process.env.YELP_CONSUMER_SECRET,
  token: process.env.YELP_TOKEN,
  token_secret: process.env.YELP_TOKEN_SECRET,
});

exports.getResults = function(coordsObj, hollaback) {
	yelp.search({offset: 0, limit: 20, sort: 1, radius_filter: '24140', term: 'restaurants', ll: `${coordsObj.lat},${coordsObj.lng}` })
	.then(function(data) {
		hollaback(null, data);
	})
	.catch(function(err) {
		hollaback(err);
	})
  // yelp.search({offset: 60, limit: 20, radius_filter: '24140', term: 'restaurants', ll: `${coordsObj.lat},${coordsObj.lng}` })
	// .then(function(data) {
	// 	hollaback(null, data);
	// })
	// .catch(function(err) {
	// 	hollaback(err);
	// })
}
