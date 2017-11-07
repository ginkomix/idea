<?php
$fh = fopen("counter.txt", "r");
$data = fread($fh, filesize("counter.txt"));
fclose($fh);
echo $data;
