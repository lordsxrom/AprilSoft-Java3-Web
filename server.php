<?PHP

header('Access-Control-Allow-Origin: *');

$dbhost = 'localhost';
$dbname = 'id12376797_aprilsoftchatdb';
$dbuser = 'id12376797_admin';
$dbpass = 'admin';

$conn = mysqli_connect($dbhost, $dbuser, $dbpass);
if (mysqli_connect_errno()) {
    printf("Connect failed: %s\n", mysqli_connect_error());
    exit();
}

mysqli_select_db($conn, $dbname);

if (isset($_GET['lastId'])) {
    $lastId = $_GET['lastId'];
    $sql = "SELECT * FROM `chat` WHERE `id` > '$lastId' ORDER BY `id` DESC";
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) > 0) {
        $named_array = array("messages" => array());
        while ($row = mysqli_fetch_array($result)) {
            array_push(
                $named_array['messages'],
                array(
                    "id" => $row['id'],
                    "time" => $row['time'],
                    "user" => $row['user'],
                    "text" => $row['text']
                )
            );
        }
        echo json_encode($named_array);
    }
}

if (isset($_POST['chat_user']) & isset($_POST['chat_message'])) {
    $user = $_POST['chat_user'];
    $text = $_POST['chat_message'];
    $time = time();
    if ($text != "" & $user != "") {
        $sql = "INSERT INTO `chat` (`id`, `time`, `user`, `text`) VALUES (null,null,'$user','$text')";
        mysqli_query($conn, $sql);
    }
}

if (isset($_POST['login_user']) & isset($_POST['login_password'])) {
    $user = $_POST['login_user'];
    $password = $_POST['login_password'];
    if ($user != "" & $password != "") {
        $sql = "SELECT * from `users` WHERE `name`='$user' AND `password`='$password' LIMIT 1";
        $result = mysqli_query($conn, $sql);
        if (mysqli_num_rows($result) > 0) {
            echo 'login';
        } else {
            echo 'fail';
        }
    }
}
