<?php
 $leter= $_POST['leter'];
$f = fopen("write.txt", "w");

	
	fwrite($f, $leter); 
	fclose($f);
echo 'Записано успешно!';
?>