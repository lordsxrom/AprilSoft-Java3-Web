var lastId = 0;
var chat_user;

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
                $('#input-message').val("");
            });
        });

        $('#frmLogout').on("submit", function(event) {
            window.localStorage.setItem('user', '');
            login();
        });
    }
);

function update() {
    $.get("https://aprilsoftchat.000webhostapp.com/server.php", { lastId: lastId },
        function(data, status) {
            if (data) {
                bundle = JSON.parse(data);
                bundle['messages'].slice().reverse().forEach(element => {
                    user = "<div class='message-user'>" + element.user + "</div>";
                    time = "<div class='message-time'>" + element.time + "</div>";
                    text = "<div class='message-text'>" + element.text + "</div>";
                    message = "<div class='message-body animate'>" + user + time + text + "</div>";
                    $('#chat-box').prepend(message);
                });
                lastId = bundle['messages'][0].id;
            }
        });

    setTimeout('update()', 5000);
}

function login() {
    chat_user = window.localStorage.getItem('user');
    if (chat_user != null && chat_user != "") {
        $('#chat-content').css("display", "block");
    } else {
        window.location = "login.html";
    }
}