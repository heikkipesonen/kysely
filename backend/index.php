<?php
require_once('ORM.php');
require_once('conf.php');
require 'flight/Flight.php';
require_once('utils.php');
require_once('query.php');

Flight::route('/',function(){
	echo 'pere';
});

Flight::route('POST /@userId',function($userId){
	$data = Flight::request()->getData();
	$id = Query::save($data);

	Flight::json(Query::getQuery($id));
});

Flight::route('POST /@userId/create',function($userId){
	Flight::json(Query::create($userId));
});

Flight::route('POST /reply/@querySlug',function($querySlug){
	Flight::json(array('ok'=>true));
});

Flight::route('GET /@userId/@questionId',function($userId,$questionId){
	Flight::json( Query::getQuery($questionId) );
});

Flight::route('POST /@userId/@questionId',function($userId,$questionId){
	$data = Flight::request()->getData();

	$data['id']=$questionId;
	Query::save($data);

	Flight::json(Query::getQuery($data['id']));	
});

Flight::route('PUT /@userId/@questionId',function($userId,$questionId){
	echo 'pweewfds';
});


Flight::start();