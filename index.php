<?php
	if (isset($_POST["submit"])) {
		$email = $_POST['contact-email'];
		$subject = $_POST['contact-subject'];
		$message = $_POST['contact-message'];
		// $human = intval($_POST['human']);
		$from = 'Demo Contact Form'; 
		$to = 'amyziyun4869@hotmail.com'; 
		$subject = 'Message from Contact Demo ';
		
		$body = "From: $subject\n E-Mail: $email\n Message:\n $message";
 
		// Check if name has been entered
		if (!$_POST['subject']) {
			$errName = 'Please enter your subject';
		}
		
		// Check if email has been entered and is valid
		if (!$_POST['email'] || !filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
			$errEmail = 'Please enter a valid email address';
		}
		
		//Check if message has been entered
		if (!$_POST['message']) {
			$errMessage = 'Please enter your message';
		}
		//Check if simple anti-bot test is correct
		// if ($human !== 5) {
		// 	$errHuman = 'Your anti-spam is incorrect';
		// }
 
// If there are no errors, send the email
// if (!$errName && !$errEmail && !$errMessage && !$errHuman) {
	if (!$errName && !$errEmail && !$errMessage) {
	if (mail ($to, $subject, $body, $from)) {
		$result='<div class="alert alert-success">Thank You! I will be in touch</div>';
	} else {
		$result='<div class="alert alert-danger">Sorry there was an error sending your message. Please try again later</div>';
	}
}
	}
?>