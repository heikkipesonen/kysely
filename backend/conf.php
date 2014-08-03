<?php
ORM::configure('mysql:host=localhost;dbname=kysely');
ORM::configure('username', 'kissa');
ORM::configure('password', 'kala');
ORM::configure('return_result_sets', true);
ORM::configure('table_prefix','q_');


define('ADMIN_USERNAME', 'koira');
define('ADMIN_PASSWORD','kissa');
?>