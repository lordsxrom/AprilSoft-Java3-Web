var lastId = 1;

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

    setTimeout('update()', 5000);
}

$(document).ready(
    function() {
        update();

        $('#frmChat').on("submit", function(event) {
            event.preventDefault();
            //$('#input-user').attr("type", "hidden");

            $.post("https://aprilsoftchat.000webhostapp.com/server.php", {
                chat_user: $('#input-user').val(),
                chat_message: $('#input-message').val()
            }, function(data, status) {
                console.log("Send status: " + status);
                $('#input-message').val("");
            });
        });

    }
);