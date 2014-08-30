Query.factory('query',['$http','$resource',function($http,$resource){
		return $resource('http://192.168.0.10/kysely/backend/:slug', {			
			slug:'@slug'
		}, {
			create:{
				method:'POST',
				params:{
					slug:'create'					
				}				
			},
			reply:{
				method:'POST',
				params:{
					userid:'response',
					slug:'@slug'
				}
			}
		});
	}]);