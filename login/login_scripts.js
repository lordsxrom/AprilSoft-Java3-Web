$(document).ready(
    function() {
        $('#frmLogin').on("submit", function(event) {
            event.preventDefault();

            $.post("https://aprilsoftchat.000webhostapp.com/server.php", {
                login_user: $('#login-user').val(),
                login_password: $('#login-password').val()
            }, function(data, status) {
                console.log("Login status: " + status);
                console.log("Response: " + data);
                if (data == "login") {
                    window.localStorage.setItem("user", $('#login-user').val());
                    console.log('location to index');
                    window.location = "../index.html";
                } else {
                    window.alert('Wrong login or password');
                }
            });


        });
    }
);