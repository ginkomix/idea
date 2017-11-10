<?php
$fh = fopen("counter.txt", "rb");
$data = fread($fh, filesize("counter.txt"));
fclose($fh);
echo $data;
