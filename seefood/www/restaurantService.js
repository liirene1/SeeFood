'use strict';

var app = angular.module('seeFoodApp');

app.service('RestaurantService', function() {
	this.restaurants = [];
	this.likes = [];

	this.setRestaurants = function(data) {
		data.businesses.forEach(ele => {
			this.restaurants.push(ele);
		});
		this.restaurants = _.shuffle(this.restaurants);
	};

	this.swipeRestaurant = function() {
		this.restaurants.splice(0, 1);
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
		console.log('param: ', param.id);
		for (var i = 0; i < this.likes.length; i++) {
			console.log('the likes id: ', this.likes[i].id);
			if(this.likes[i].id === param.id) return this.likes[i];
		}
	}
});
