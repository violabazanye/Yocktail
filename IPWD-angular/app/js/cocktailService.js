yocktailApp.factory('Cocktail',function ($resource, $firebaseAuth) {

	var user = '';

	var firebaseObj = new Firebase("https://yocktail.firebaseio.com");
	var authObj = $firebaseAuth(firebaseObj);

	this.getUser = function(){
		if (user == '') {
			var userObject = localStorage.getItem("yocktailUser");
			if (userObject) {
				try{
					console.log("userObject: " + userObject);
					user = JSON.parse(userObject);
				}catch(e){
					console.log("Error in parse JSON: " + e);
				}
			}else{
				// do nothing
			}
		}else{
			// do nothing
		}
		
		console.log("CocktailService getUser user:");
		console.log(user);
		return user;
	} 

	this.setUser = function(type, value){
		console.log("Cocktail setuser");
		if (type === "user") {
			localStorage.setItem("yocktailUser", JSON.stringify(value));
			user = value;
			console.log("CocktailService setUser user");
			console.log(user);
		}else{
			if(user){
				user[type] = value;
				localStorage.setItem("yocktailUser", JSON.stringify(user));
				console.log("CocktailService setUser user");
				console.log(user);
			}else{
				// do nothing
				console.log("user is null");
			}
		}
	}

	this.logoutUser = function(){
		authObj.$unauth();
		user = '';
		localStorage.removeItem('yocktailUser');
		console.log("CocktailService logoutUser user"+user);
	}

	this.isSignedIn = function(){
		var isSignedIn = false;

		if(user == ''){
			// do nothing
		}else{
			isSignedIn = true;
		}

		return isSignedIn;
	}

	var firebaseObj = new Firebase("https://yocktail.firebaseio.com");

	this.CocktailQuerySearch = $resource('https://crossorigin.me/https://addb.absolutdrinks.com/drinks/with/:input',{apiKey:'003234e57e7a4a0a83f3b1d671c597da'});

	this.PopularCocktails = $resource('https://crossorigin.me/https://addb.absolutdrinks.com/drinks/rating/:numerical_condition',{apiKey:'003234e57e7a4a0a83f3b1d671c597da'});

	this.CocktailSearch = $resource('https://crossorigin.me/https://addb.absolutdrinks.com/drinks/',{apiKey:'003234e57e7a4a0a83f3b1d671c597da'});

	this.OccasionSearch = $resource('https://crossorigin.me/https://addb.absolutdrinks.com/drinks/with/:ingredient/for/:occasion_id',{apiKey:'003234e57e7a4a0a83f3b1d671c597da'});

	this.SingleCocktail = $resource('https://crossorigin.me/https://addb.absolutdrinks.com/drinks/:id',{apiKey:'003234e57e7a4a0a83f3b1d671c597da'});

	this.Top10Cocktails = $resource('https://crossorigin.me/https://addb.absolutdrinks.com/drinks/rating/:numerical_condition',{start:0,pagesize:10,apiKey:'003234e57e7a4a0a83f3b1d671c597da'});

	this.OccasionSearch_two = $resource('https://crossorigin.me/https://addb.absolutdrinks.com/drinks/for/:occasion_id',{apiKey:'003234e57e7a4a0a83f3b1d671c597da'});


	return this;

});

