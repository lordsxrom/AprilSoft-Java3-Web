var lastId = 1;
var chat_user;

function update() {
    $.get("https://aprilsoftchat.000webhostapp.com/server.php", { lastId: lastId },
        function(data, status) {
            console.log("Upgate status: " + status);
            console.log(data);
            if (data) {
                bundle = JSON.parse(data);
                bundle['messages'].slice().reverse().forEach(element => {
                    user = "<div class='message-user'>" + element.user + "</div>";
                    time = "<div class='message-time'>" + element.time + "</div>";
                    text = "<div class='message-text'>" + element.text + "</div>";
                    message = "<div class='message-body'>" + user + time + text + "</div>";
                    $('#chat-box').prepend(message);
                });
                lastId = bundle['messages'][0].id;
            }
        });

    // setTimeout('update()', 5000);
}

function login() {
    chat_user = window.localStorage.getItem('user');
    console.log("user name: " + chat_user);

    if (chat_user == null || chat_user == "") {
        console.log('location to login page');
        window.location = "login.html";
    }

    $('#chat-content').css("display", "block");
}

$(document).ready(
    function() {
        login();
        update();

        $('#frmChat').on("submit", function(event) {
            event.preventDefault();

            $.post("https://aprilsoftchat.000webhostapp.com/server.php", {
                chat_user: chat_user,
                chat_message: $('#input-message').val()
            }, function(data, status) {
                console.log("Send status: " + status);
                $('#input-message').val("");
            });
        });

        $('#btnLogout').click(function() {
            window.localStorage.setItem('user', '');
            login();
        });

    }
);