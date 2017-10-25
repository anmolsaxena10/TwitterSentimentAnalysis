<?php
$query = $_GET['query'];

$command = escapeshellcmd('twitter.py '.$query);
$output = shell_exec($command);

header("Content-Type: application/json", true);

echo ($output);
?>