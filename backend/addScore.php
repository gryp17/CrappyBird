<?php
    require 'DB.php';
    
    $score = $_POST["score"];
    $user = trim($_POST["username"]);
    
    if(strlen($user) == 0){
        $user = "anonymous";
    }
    
    $con = DB::getConnection();
	$query = $con->prepare("INSERT INTO score(username, score, date) VALUES (:username, :score, now())");
	$params = array("username" => $user, "score" => $score);
	$query->execute($params);
	
?>

