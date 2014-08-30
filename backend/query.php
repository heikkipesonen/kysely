<?php
class Query{
	private static $queryTable = 'q_query';
	private static $questionTable = 'q_question';
	private static $answerTable = 'q_answers';

	private static $replyTable = 'q_reply';


	public static function createQuery(){
		$query = array('id'=>generateRandomString());

		return $query;
	}
}