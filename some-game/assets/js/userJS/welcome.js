///**
// * Created by uditj on 1/29/16.
// */
//
//
///*
//for(i=0;i<10;i++){
//    socket = io();
//    //console.log(i+'->');
//    }*/
////    var socketIsOn = false;
//$('form').submit(function () {
//        var userName = $('#m').val();
//
//
////        io.emit('post', {url: 'http://localhost:1337/register', data: {name: 'joe'}});
////        //console.log(socket);
////var socket = null ;
////        //console.log('Initial socket = '+socket);
//
//        var socket = io('http://localhost:1337/register', {name: userName});
//
//        $.ajax({
//            type: 'POST',
//            data: JSON.stringify({name: userName}),
//            contentType: 'application/json',
//            url: 'http://localhost:1337/register',
//            success: function (data) {
//                //console.log('success');
//                //console.log(JSON.stringify(data));
//                $('#messages').append($('<li>').text('I am from ajax ' + data.name + ' ..!!!'));
//    }
//    });
//
//
//    socket.on('hi', function (msg) {
//        $('#messages').append($('<li>').text('Server called client.1st Hi event ' + msg + ' ..!!!'));
//        });
//    socket.on('hi2nd', function (msg) {
//        $('#messages').append($('<li>').text('Server called client.2nd high event. ' + msg + ' ..!!!'));
//        });
//
//
//    setInterval(function () {
//        socket.emit('hi', 'Delay calling');
//        }, 5000);
//
//    return false;
//    });
//
//

function registerUser() {

    var serverURL = serverInfo.serverAddress + ":" + serverInfo.port + "/" + serverInfo.registerUser;

    var userName = $('#userName').val();

    var user = JSON.parse(localStorage.getItem("user"));
    var userId = null;
    if (user) {
        userId = user.id;
    }
    if (userId == "undefined") {
        userId = null;
    }

    //console.log(userId);

    var socket = io(serverURL, {userName: userName, userId: userId, isAjax: 0});

    if (makeAjaxCall == 1) {
        $.ajax({
            type: 'POST',
            data: JSON.stringify({userName: userName, userId: userId, isAjax: 1}),
            contentType: 'application/json',
            url: serverURL,
            success: function (data) {
                makeAjaxCall = 0;
//                console.log("Ajax received response");
            }
        });
    }
    /**
     * Registration
     */

    var serverArray = {socketId: '', userId: ''};
    var socketId;
    var gameId;

    socket.on('registrationSuccessful', function (msg) {
        serverArray = msg;
        var socketIdFromServer = serverArray.user.socketId;
        var userFromServer = serverArray.user;
        localStorage.setItem("socketId", socketIdFromServer);
        localStorage.setItem("user", JSON.stringify(userFromServer));

        $('#userName').val('');

        // Next page procedure
        $('#registerDiv').hide("slow", function() {
            $('#userListDiv').show("slow");
        });

    });

    socket.on('registrationFail', function (msg) {
        //console.log(msg);
        socket.emit('disconnect', 'Failed while registration');
    });

    /**
     * UserList
     */

    socket.on('userList', function (msg) {
        $('#userListDiv').show("slow");
    });

    /**
     * Game-Events
     */

//    socket.on(gameId + socketId + "-startGame", function (msg) {
//        //console.log(msg);
//    });
//
//    socket.on(gameId + socketId + "-makeMove", function (msg) {
//        //console.log(msg);
//    });
//
//    socket.on(gameId + socketId + "-wait", function (msg) {
//        //console.log(msg);
//    });
//
//    socket.on(gameId + socketId + "-end", function (msg) {
//        //console.log(msg);
//    });
}
