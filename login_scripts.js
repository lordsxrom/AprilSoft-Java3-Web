$(document).ready(

    function() {
        $('#frmLogin').on("submit", function(event) {
            event.preventDefault();

            $.post("https://aprilsoftchat.000webhostapp.com/server.php", {
                login_user: $('#login-user').val(),
                login_password: $('#login-password').val()
            }, function(data, status) {
                if (data == "login") {
                    window.localStorage.setItem("user", $('#login-user').val());
                    window.location = "index.html";
                } else {
                    window.alert('Wrong login or password');
                }
            });

        });
    }

);