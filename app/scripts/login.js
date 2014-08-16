kysely.service('login', ['$http', function($http){
	
	this.id = 0;
	this.password = '';
	this.name = '';
	this.level = false;
	
  this.create = function(username, password){
    return $http.post(REST_URL+'/login/create',{username:username,password:md5(password)});
  }

	this.login = function(){
		var me = this;

		$http.post(REST_URL+'/login',{username:this.name,password:md5(this.password)})
			.success(function(data){

				if (data.username && data.level){  					
            me.name = data.username;
            me.level = data.level;
            me.password = '';
				} else {
					  me.level = false;
				}

			});
	}

	this.logout = function(){
		var me = this;

		$http.post(REST_URL+'/logout',{username:this.name})
			.success(function(data){

  				me.name = data.username;
  				me.level = data.level;
  				me.password = '';

			});
	}  		
}]);