<?php
	header("content-type:text/html; charset=utf-8"); 
	header("Access-Control-Allow-Origin: *");
	//输出图片
	$output = ['data' => []];
	$n = empty($_GET['num']) ? 1 : $_GET['num'];
	$_n = 10*$n;
	for($i=0;$i<$_n;$i++){
		array_push($output['data'],('http://www.rni-l.com/plugins/demo/images/pic'.($i%10).'.jpg'));
	}
	array_push($output['data'],('http://www.rni-l.com/plugins/demo/images/pic222.jpg'));
	echo json_encode($output);


?>