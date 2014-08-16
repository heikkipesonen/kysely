<?php
class Query{
	private static $queryTable = 'q_query';
	private static $questionTable = 'q_question';
	private static $answerTable = 'q_answers';

	private static $replyTable = 'q_reply';


	public static function getSlug(){
		$str = generateRandomString(4);

		$exists = ORM::for_table(self::$queryTable)->where('slug',$str)->find_one();
		if (is_object($exists)){
			$str = self::getSlug();
		}

		return $str;
	}

	public static function deleteAnswer($id){
		ORM::for_table(self::$answerTable)->where('id',$id)->delete();
	}

	public static function deleteAnswers($question_id){
		ORM::for_table(self::$answerTable)->where('question_id',$question_id)->delete_many();
	}

	public static function deleteQuestion($id){
		$o = ORM::for_table(self::$answerTable)->where('id',$id)->find_one();

		if (is_object($o)){
			self::deleteAnswers($o->id);
			ORM::for_table(self::$answerTable)->where('id',$id)->delete();
		}
	}

	public static function deleteQuestions($query_id){
		ORM::for_table(self::$answerTable)->where('query_id',$query_id)->delete_many();
	}

	public static function save($data){
		$o = ORM::for_table(self::$queryTable);
		$query = '';

		if (isset($data['slug'])){
			$query = $o->where('slug',$data['slug'])->find_one();
		} 
		
		if (!is_object($query)){
			$query = $o->create();
			$query->slug = self::getSlug();
		}
		
		
	
		if (is_object($query)){
			$query->title = $data['title'];	
			$query->save();

			if (isset($data['questions'])){
				$questions = self::saveQuestions($query->id, $data['questions']);
			}

			return $query->slug;
		}
		return false;
	}

	public static function saveQuestions($query_id, $data){
		//$question = $o->where('id',$question_data['id'])->where('query_id',$query_id)->find_one();		
				 
		foreach ($data as $question_data) {
			$o = ORM::for_table(self::$answerTable);
			

			$question = $o->create();	
			

			if (is_object($question)){
				$question->label = $question_data['label'];
				$question->type = $question_data['type'];
				$question->name = $question_data['name'];

				$question->query_id = $query_id;

				$question->save();

				$result = $question->as_array();

				if (isset($question_data['answers'])){
					self::saveAnswers($question->id(), $question_data['answers']);
				}
			}
		}
	}

	public static function saveAnswers($question_id, $data){
		foreach ($data as $answer_data) {
			$o = ORM::for_table(self::$answerTable);

			$answer = $o->create();	

			$answer->question_id = $question_id;
			$answer->label = $answer_data['label'];
			$answer->name = $answer_data['name'];
			$answer->value = $answer_data['value'];

			$answer->save();
		}
	}

	public static function saveReply($slug, $query, $instance){
		$queryObj = ORM::for_table(self::$queryTable)->where('slug',$slug)->find_one();

		if (is_object($queryObj)){
			$query_id = $queryObj->id();

			foreach ($query['questions'] as $question){
				if ($question['type'] == 'radio'){				

					$reply = ORM::for_table(self::$replyTable)->create();
					$reply->value = $question['value'];
					$reply->answer_id = $question['id'];
					$reply->question_id = $question['id'];
					$reply->instance = $instance;
					
				} else {

					foreach ($question['answers'] as $answer){

						$reply = ORM::for_table(self::$replyTable)->create();
						$reply->value = $answer['value'];
						$reply->answer_id = $answer['id'];
						$reply->question_id = $question['id'];
						$reply->instance = $instance;

						$reply->save();
					}
				}
			}

			return true;
		}

		return false;
	}



	public static function getQuery($slug){
		$result=array();		

		$query = ORM::for_table(self::$queryTable)->where('slug',$slug)->find_one();

		if (is_object($query)){
			$result = $query->as_array();
			$result['questions'] = array();

			$questions = ORM::for_table(self::$answerTable)->where('query_id',$query->id)->find_many();

			foreach ($questions as $question) {
				$answers = ORM::for_table(self::$answerTable)->where('question_id',$question->id)->find_many();

				$q = $question->as_array();
				$q['answers'] = array();

				if (is_object($answers)){

					foreach ($answers as $answer) {
						$q['answers'][] = $answer->as_array();
					}
				}

				$result['questions'][] = $q;
			}

		} else {
			$result['error']=true;
		}

		return $result;
	}

	public static function create($user_id){
		$q = ORM::for_table(self::$queryTable)->create();
		$q->slug = self::getSlug();
		$q->title = 'nimeämätön kysely';
		$q->user_id =$user_id;
		$q->save();

		return $q->as_array();
	}


	public static function getList($user_id){
		$list = ORM::for_table(self::$queryTable)->find_many();

		$queries = array();
		
		foreach ($list as $q) {
			$queries[] = $q->as_array();
		}

		return $queries;
	}
}