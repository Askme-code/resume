<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer-master/src/PHPMailer.php';
require 'PHPMailer-master/src/SMTP.php';
require 'PHPMailer-master/src/Exception.php';


$mail = new PHPMailer(true);

try {
  $mail->isSMTP();
  $mail->Host = 'smtp.gmail.com';
  $mail->SMTPAuth = true;
  $mail->Username = 'kimumilangali@gmail.com';
  $mail->Password = 'qutr sxrt hteg vvoy'; // Your Gmail App Password
  $mail->SMTPSecure = 'tls';
  $mail->Port = 587;

  $mail->setFrom($_POST['email'], $_POST['name']);
  $mail->addAddress('kimumilangali@gmail.com'); // Receiver address

  $mail->isHTML(false);
  $mail->Subject = $_POST['subject'];
  $mail->Body = "From: {$_POST['name']}\nEmail: {$_POST['email']}\n\n{$_POST['message']}";

  $mail->send();
  echo 'OK';
} catch (Exception $e) {
  echo "Sorry, the email could not be sent. Error: {$mail->ErrorInfo}";
}
?>
