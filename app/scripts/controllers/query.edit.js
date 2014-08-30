Query.controller('editController', ['$scope','query', function($scope, query){
	
	angular.extend($scope, {
		query: null,

		getId:function(length){
		    if (!length) length = 32;

		    var text = "";
		    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

		    for( var i=0; i < length; i++ )
		        text += possible.charAt(Math.floor(Math.random() * possible.length));

		    return text;
		},

		create:function(){
			$scope.query = new query();
			$scope.query.id  = $scope.getId();
			$scope.query.questions = [];
		},


		save:function(){

		},


		createQuestion:function(type){
			if (type===undefined) type="text";

			return {
				id:$scope.getId(),
				name:'',
				text:'undefined',
				title:'undefined',
				type:type,
				answers:[]
			};
		},

		createAnswer:function(){
			return {
				id:$scope.getId(),
				value:null
			}
		},

		addQuestion:function(type){
			console.log('sadfökldfs')
			$scope.query.questions.push( $scope.createQuestion(type) );
		},


		removeQuestion:function(index){
			$scope.query.questions.splice(index,1);
		},


		addAnswer:function(questionIndex){
			$scope.query.questions[questionIndex].answers.push( $scope.createAnswer() );
		},


		removeAnswer:function(questionIndex, answerIndex){
			$scope.query.questions[questionIndex].answers.splice(answerIndex,1);
		}
	
	});

	$scope.create();
	console.log($scope.query)
}]);