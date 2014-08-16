<?php
class User {
	private static $table  = 'q_user';
	private static $salt  = 'lkad gd gart AERTLET -ert epoirteropt weHTrysojirtauwr4 ret3546094ok34dklfg aklsöadfsklö';

	public static function create($username, $password){
		
		$exists = ORM::for_table(self::$table)->where('username',$username)->find_one();

		if (is_object($exists)){
			return array('exists'=>true);
		}

		$user = ORM::for_table(self::$table)->create();
		
		$user->password = self::cryptPassword($password);
		$user->username = $username;
		$user->level = 1;

		$user->save();

		return array('username'=>$user->username, 'id'=>$user->id(), 'level'=>$user->level);
	}

	public static function cryptPassword($password){
		return md5($password.self::$salt);
	}

	public static function authorize($username, $password){
		$user = ORM::for_table(self::$table)
			->where('username',$username)
			->where('password',self::cryptPassword($password) )
			->select_many(array('username','level','id'))
			->find_one();


		if (is_object($user)){
			return $user->as_array();
		} else {
			return array('level'=>false,'username'=>false);
		}
	}


	public static function getList(){
		$users = ORM::for_table(self::$table)
			->where_not_null('username')
			->select_many(array('username','level','id'))
			->find_many();

		$result = array();
		foreach ($users as $user) {
			$result[] = $user->as_array();
		}

		return $result;
	}
}