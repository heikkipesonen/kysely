kysely.controller('toolbarController', ['$scope','$location','login', function($scope,$location,login){
		$scope.$watch('$location.url()',function(){
			$scope.selectByLink($location.url());
		});

		angular.extend($scope,{
			tools:[
				{
					name:'Alkuun',
					description:'takaisin alkuun',
					image:'home-outline',
					link:'/'					
				},
				{
					name:'käyttäjät',
					description:'hallitse käyttäjiä',
					image:'contact-outline',
					link:'/kayttajat'
				},				
				{
					name:'kyselyt',
					description:'selaa kyselyitä',
					image:'albums-outline',
					link:'/kyselyt/'+login.id
				},
				{
					name:'uusi',
					description:'luo uusi',
					image:'plus-outline',
					link:'/uusi/'+login.id,
					submenu:[
						{
							name:'tallenna',
							description:'tallenna kysely',
							image:'cloud-upload-outline',				
							action:'saveQuery'
						},
						{
							name:'monivalinta',
							description:'valitse monta',
							image:'checkmark-outline',
							data:'checkbox',
							action:'addQuestion'
						},
						{
							name:'valinta',
							description:'valitse yksi',
							image:'circle-filled',
							data:'radio',
							action:'addQuestion'
						},
						{
							name:'tekstikenttä',
							description:'yksirivinen teksti',
							image:'compose-outline',
							data:'text',
							action:'addQuestion'
						},
						{
							name:'tekstialue',
							description:'monirivinen tekstialue',
							image:'compose-outline',
							data:'textarea',
							action:'addQuestion'
						},
					]		
				},
			],
			selectByLink:function(link){
				$scope.closeSubmenus();
				$.each($scope.tools, function(){
					
					if (this.link === link){
						this.open = true;
					}
				})
			},
			toolAction:function(action, data){
				if ($scope[action]){
					$scope[action](data);
				}
			},
			openSubmenu:function(menuIndex){
				if (this.tools[menuIndex]){
					this.tools[menuIndex].open = true;
				}
			},
			closeSubmenus:function(){
				$.each($scope.tools, function(){
					this.open = false;
				});
			}
		});
	}])