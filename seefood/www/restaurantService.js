 'use strict';

var app = angular.module('seeFoodApp');

app.service('RestaurantService', function($http, API) {

	this.restaurants = [];
	this.likes = [];

	this.setRestaurants = function(data) {
		data.businesses.forEach(ele => this.restaurants.push(ele));
		this.restaurants = _.shuffle(this.restaurants);
	};

	this.swipeRestaurant = function() {
		this.restaurants.splice(0, 1);
		if(this.restaurants.length === 5) this.getRestaurants();
	};

	this.grabRestaurant = function() {
		return this.restaurants[0];
	};

	this.grabLikes = function() {
		return this.likes;
	};

	this.addLike = function() {
		this.likes.push(this.restaurants[0]);
	};

	this.findLike = function(param) {
		for (var i = 0; i < this.likes.length; i++) {
			if(this.likes[i].id === param.id) return this.likes[i];
		}
	}

	this.coordObj = {};

	this.getRestaurants = function(lat, lng) {
		if(lat || lng) {
			this.coordObj = {
				count: 0,
				lat: lat,
				lng: lng
			}
		}
		return $http.put(`${API}/restaurants`, this.coordObj)
		.then(res => {
			this.coordObj.count += res.data.businesses.length;
			this.setRestaurants(res.data);
			return res;
		}, err => console.error(err));
	}
});
