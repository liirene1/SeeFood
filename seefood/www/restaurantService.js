'use strict';

var app = angular.module('seeFoodApp');

app.service('RestaurantService', function() {
	this.restaurants = [];
	this.likes = [];

	this.setRestaurants = function(data) {
		console.log('DATA!!!!: ', data);
		data.businesses.forEach(ele => {
			this.restaurants.push(ele);
		});
		this.restaurants = _.shuffle(this.restaurants);
		console.log('this.restaurants: ', this.restaurants);
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

	this.setLikes = function(like) {
		this.likes.push(like);
	};
});