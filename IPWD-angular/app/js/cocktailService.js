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
		
		console.log("CocktailService getUser user"+user);
		return user;
	} 

	this.setUser = function(value){
		localStorage.setItem("yocktailUser", JSON.stringify(value));
		user = value;
		console.log("CocktailService setUser user"+user);
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

	this.CocktailQuerySearch = $resource('http://addb.absolutdrinks.com/drinks/with/:input',{apiKey:'003234e57e7a4a0a83f3b1d671c597da'});

	this.PopularCocktails = $resource('http://addb.absolutdrinks.com/drinks/rating/:numerical_condition',{apiKey:'003234e57e7a4a0a83f3b1d671c597da'});

	this.CocktailSearch = $resource('http://addb.absolutdrinks.com/drinks/',{apiKey:'003234e57e7a4a0a83f3b1d671c597da'});

	this.OccasionSearch = $resource('http://addb.absolutdrinks.com/drinks/for/:occasion_id',{apiKey:'003234e57e7a4a0a83f3b1d671c597da'});

	this.SingleCocktail = $resource('http://addb.absolutdrinks.com/drinks/:id',{apiKey:'003234e57e7a4a0a83f3b1d671c597da'});

	this.CocktailTastes = $resource('http://addb.absolutdrinks.com/drinks/tasting/:taste_id',{apiKey:'003234e57e7a4a0a83f3b1d671c597da'});
	//was for searching similar drinks, but...

	return this;

});

