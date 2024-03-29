<?php
require_once('ORM.php');
require_once('conf.php');
require 'flight/Flight.php';
require_once('utils.php');
require_once('query.php');

Flight::route('/',function(){
	Flight::json(array('ok'=>'true'));
});

Flight::route('GET /list/@userid',function($userid){
	Flight::json( Query::getList($userid) );
});

Flight::route('POST /@userId',function($userId){
	$data = Flight::request()->getData();
	$slug = Query::save($data);

	Flight::json(Query::getQuery($slug));
});

Flight::route('POST /@userId/create',function($userId){
	Flight::json(Query::create($userId));
});

Flight::route('POST /reply/@querySlug/@instance',function($querySlug,$instance){
	$data = Flight::request()->getData();
	
	Query::saveReply($querySlug, $data, $instance);
	
	Flight::json(array('ok'=>true));
});

Flight::route('GET /@userId/@querySlug',function($userId,$querySlug){
	Flight::json( Query::getQuery($querySlug) );
});

Flight::route('POST /@userId/@querySlug',function($userId,$querySlug){
	$data = Flight::request()->getData();

	$data['slug']=$querySlug;
	Query::save($data);

	Flight::json(Query::getQuery($data['slug']));	
});



Flight::start();