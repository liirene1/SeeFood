 'use strict';

var app = angular.module('seeFoodApp');

app.service('RestaurantService', function($http, API) {

	this.restaurants = [];
	this.likes = [];
	this.filterObj = {};

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

	this.buildFilter = function(obj) {
		console.log('1st filterObj: ', this.filterObj);
		this.filterObj = {
			count: 0,
			radius: obj.radius ? obj.radius / 0.00062137 : 10 / 0.00062137,
			category: ''
		}
		
		if(obj.lat || obj.lng) {
			this.filterObj.lat = obj.lat;
			this.filterObj.lng = obj.lng;
		}
		
		if(obj.location) {
			this.getCoords(obj.location)
				.then(res => { 
					this.filterObj.lat = res.data.results[0].geometry.location.lat;
					this.filterObj.lng = res.data.results[0].geometry.location.lng;
					console.log('this.filterObj promise: ', this.filterObj);
				}, err => console.error(err));;
		}

		var categories = [];
		obj.glutenFree ? categories.push('gluten-free') : '';
		obj.vegetarian ? categories.push('vegetarian') : '';
		obj.vegan ? categories.push('vegan') : '';
		obj.kosher ? categories.push('kosher') : '';
		if(obj.glutenFree || obj.vegetarian || obj.vegan || obj.kosher)
		this.filterObj.category = categories.join(',');
		console.log('2nd filterObj: ', this.filterObj);
		this.getRestaurants();
	}

	this.getRestaurants = function() {
		return $http.put(`${API}/restaurants`, this.filterObj)
		.then(res => {
			console.log(res.data.businesses);
			this.filterObj.count += res.data.businesses.length;
			this.setRestaurants(res.data);
			return res;
		}, err => console.error(err));
	}

	this.getCoords = function(address) {
		var urlAddress = address.split(' ').join('+');
		return $http.get(`https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyCVFibjTMF6wEQUlCV_O5zILn5urQUZ6Zo&address=${urlAddress}`);
	}

});
