<?php
    require 'DB.php';
    
    $html = "<thead>
            <tr>
                <td>Username</td>
                <td>Score</td>
            </tr>
            <tr>
                <td colspan='2'><hr width='80%' class='center'/></td>
            </tr>
            </thead>";
    
    $con = DB::getConnection();
	$query = $con->prepare("SELECT username, score FROM score ORDER BY score DESC, date, username LIMIT 5");
	$query->execute();
	
	while ($row = $query->fetch()) {
		 $html .= "<tr>
                    <td>$row[0]</td>
                    <td>$row[1]</td>
                </tr>";
	}
	    
    echo $html;
?>

