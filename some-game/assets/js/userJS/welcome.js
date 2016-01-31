///**
// * Created by uditj on 1/29/16.
// */
//
//
///*
//for(i=0;i<10;i++){
//    socket = io();
//    console.log(i+'->');
//    }*/
////    var socketIsOn = false;
//$('form').submit(function () {
//        var userName = $('#m').val();
//
//
////        io.emit('post', {url: 'http://localhost:1337/register', data: {name: 'joe'}});
////        console.log(socket);
////var socket = null ;
////        console.log('Initial socket = '+socket);
//
//        var socket = io('http://localhost:1337/register', {name: userName});
//
//        $.ajax({
//            type: 'POST',
//            data: JSON.stringify({name: userName}),
//            contentType: 'application/json',
//            url: 'http://localhost:1337/register',
//            success: function (data) {
//                console.log('success');
//                console.log(JSON.stringify(data));
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

    var userName = $('#startButton').val();

    var socket = io(serverURL, {name: userName});

        $.ajax({
            type: 'POST',
            data: JSON.stringify({name: userName}),
            contentType: 'application/json',
            url: serverURL,
            success: function (data) {
                console.log(JSON.stringify(data));
                $('#messages').append($('<li>').text('I am from ajax ' + data.name + ' ..!!!'));
    }
    });
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
}
