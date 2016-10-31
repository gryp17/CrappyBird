<?php

class DB {

    public static function getConnection() {
        try {
            $opc = array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8");
            $dsn = "mysql:host=localhost;dbname=crappybird";
            $user = "root";
            $password = "1234";
            $connection = new PDO($dsn, $user, $password, $opc);
        } catch (Exception $e) {
            die($e->getMessage());
        }
        return $connection;
    }

}
?>