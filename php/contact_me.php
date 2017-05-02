<?php

error_reporting(E_ALL); ini_set('display_errors', 1);
 header('Access-Control-Allow-Origin: *');  
// Check for empty fields
if(empty($_POST['fname'])  		||
   empty($_POST['email']) 		||
   empty($_POST['contact_number']) 		||
   empty($_POST['message'])	||
   !filter_var($_POST['email'],FILTER_VALIDATE_EMAIL))
   {
	echo "No arguments Provided!";
	return false;
   }
	
$fname = $_POST['fname'];
$email_address = $_POST['email'];
$contact_number = $_POST['contact_number'];
$message = $_POST['message'];
	
// Create the email and send the message
$to = 'usama.tasneem@eikon7.com'; // Add your email address inbetween the '' replacing yourname@yourdomain.com - This is where the form will send a message to.
$email_subject = "You have received a new message from Trademore.";
$email_body = "You have received a new message from your website contact form.\n\n"."Here are the details:\n\nName: $fname\n\nEmail: $email_address\n\Contact Number: $contact_number\n\nMessage:\n$message";
$headers .= "Reply-To: $email_address";	
mail($to,$email_subject,$email_body);
return true;			
?>