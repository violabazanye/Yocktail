yocktailApp.factory('Cocktail',function ($resource, $firebaseAuth) {
  	
	var user = '';

	var firebaseObj = new Firebase("https://yocktail.firebaseio.com");
	var authObj = $firebaseAuth(firebaseObj);

	this.getUser = function(){
		if (user == '') {
			user = JSON.parse(localStorage.getItem("yocktailUser"));
			if(!user){
				user = '';
			}else{
				// do nothing
			}
		}else{
			// do nothing
		}
		
		return user;
	} 

	this.setUser = function(value){
		localStorage.setItem("yocktailUser", JSON.stringify(value));
		user = value;
	}

	this.logoutUser = function(){
		authObj.$unauth();
	    user = '';
	    localStorage.removeItem('yocktailUser');
	}

	var firebaseObj = new Firebase("https://yocktail.firebaseio.com");

	this.CocktailQuerySearch = $resource('http://addb.absolutdrinks.com/drinks/with/:input',{apiKey:'003234e57e7a4a0a83f3b1d671c597da'});

	this.PopularCocktails = $resource('http://addb.absolutdrinks.com/drinks/rating/:numerical_condition',{start:0,pageSize:4,apiKey:'003234e57e7a4a0a83f3b1d671c597da'});

	this.CocktailSearch = $resource('http://addb.absolutdrinks.com/drinks/',{apiKey:'003234e57e7a4a0a83f3b1d671c597da'});

	this.OccasionSearch = $resource('http://addb.absolutdrinks.com/drinks/for/:occasion_id',{apiKey:'003234e57e7a4a0a83f3b1d671c597da'});

	this.SingleCocktail = $resource('http://addb.absolutdrinks.com/drinks/:id',{apiKey:'003234e57e7a4a0a83f3b1d671c597da'});

	return this;

});

