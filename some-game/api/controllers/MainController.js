/**
 * UserController
 *
 * @description :: Server-side logic for managing user
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var MainController = {

    register: function (req, res) {

        var params = req.params.all();
        var connectedUsers = [];
        var user = {id: params.userId, name: params.userName, socketId: ''};
        var isAjax = params.isAjax;
        var socketId = null;

        var socketRequest = sails.io.of('/register');

        socketRequest.on('connection', function (socket, err) {
            socketId = socket.conn.id;
//            user.socketId = socketId;
            console.log(socketId + ': Connected');

            if (err) {
                socket.emit('registrationFail', err);
            }
//            console.log('user id = ' + user.id);
            if (user.id === '' || user.id === null || user.id == 'undefined') {
//                console.log('if');
                User.findOrCreate({name: user.name}, {name: user.name}).exec(function createCB(err, userData) {
                    if (err) {
                        socket.emit('registrationFail', err);
                    }
                    //console.log('user id blank');
                    //console.log(userData);

                    user = userData;

                    //console.log('Now user id = ' + user.id);
                    User.update({id: user.id}, {id: user.id, socketId: socketId}).exec(function afterwards(err, updated) {

                        if (err) {
                            socket.emit('registrationFail', err);
                            //console.log(err);
                        }
                        //console.log('socket id updated');
                        user = updated[0];
                        //console.log(user);

                        var responseArray = {user: user};

                        socket.emit('registrationSuccessful', responseArray);
//                        connectedUsers.push(user);
                        User.find().exec(function createCB(err, connectedUserData) {
                            socket.emit('userListUpdate', connectedUserData);
                        });
                    });
                });
            } else if (user.id != "undefined" && user.id !== "undefined") {
//                console.log('else If');
//                console.log(user.id);
                User.findOrCreate({id: user.id}, {name: user.name}).exec(function findOneCB(err, found) {
                    if (err) {
                        socket.emit('registrationFail', err);
                    }
                    //console.log('not blank');
//                    console.log(found);
                    user = found;

                    User.update({id: user.id}, {id: user.id, socketId: socketId}).exec(function afterwards(err, updated) {

                        if (err) {
                            socket.emit('registrationFail', err);
                            //console.log(err);
                        }
                        //console.log('socket id updated');
                        user = updated[0];
//                        console.log('after update');
//                        console.log(user);
                        var responseArray = {user: user};

                        socket.emit('registrationSuccessful', responseArray);
//                        connectedUsers.push(user);
                        User.find().exec(function createCB(err, connectedUserData) {
                            socket.emit('userListUpdate', connectedUserData);
                        });

                    });

                });
            }

//            Game.create({gameArray: game.gameArray}).exec(function createCB(err, created) {
//                game = created;
//            });

            socket.on('disconnect', function (name) {
                console.log('Disconnected : ' + name);
            });
        });

//        if (isAjax == 1) {
//            return res.json('Success');
//        }

//        sails.sockets.on('hi', function(name){
//            //console.log('client called server. 1st hi');
//        });
//
//        sails.sockets.on('hi2nd', function(name){
//            //console.log('client called server. 2nd hi');
//        });
//
//        socket.on('disconnect', function(name){
//            //console.log('someone disconnected');
//        });
//
//        sails.sockets.emit('hi2nd');
//        sails.sockets.emit('hi');

//        return res.json(params.name);
        /*
         var params = req.params.all();
         var socketId = sails.sockets.id(req);
         User.create({name: params.name,socketId:socketId}).exec(function createCB(err, user) {

         User.subscribe(req, user, 'Game');

         User.watch(req);

         Game.watch(req);

         User.publishCreate(user, req);

         var myResponse = {
         'code': 0,
         'description': 'Success',
         'data': []
         };

         if (err) {
         myResponse.code = 0;
         myResponse.description = 'Error.' + err.errmsg;
         myResponse.data = err.errno;
         return res.json(myResponse);
         } else {
         myResponse.code = 1;
         myResponse.description = 'Success';
         myResponse.data = {
         'id': user.id,
         'name': user.name,
         'value': user.value
         };
         }
         return req.json(user.name);

         });
         */
    },
    getList: function (req, res) {
        var params = req.params.all();
        User.find({}).exec(function findCB(err, found) {

//            var userList;
//            while (found.length)
//            {
//
//                userList
//
//            }

            var myResponse = {
                'code': 0,
                'description': 'Success',
                'data': []
            };

            if (err) {
                myResponse.code = 0;
                myResponse.description = 'Error.' + err.errmsg;
                myResponse.data = err.errno;

            } else {
                myResponse.code = 1;
                myResponse.description = 'Success';
                myResponse.data = {
                    'userList': found
                };
            }
            return res.json(myResponse);
        });
    },
    startSession: function (req, res) {
        //console.log("starting");
        var myResponse = {
            'code': 0,
            'description': 'Success',
            'data': []
        };
        var data_from_client = req.params.all();

        // Get the socket ID from the reauest
        var socketId = sails.sockets.id(req);

        var userArray = {"user1": data_from_client.user1, "user2": data_from_client.user2};

        var dbObject = {gameId: socketId,
            gameArray: data_from_client.gameArray,
            userArray: userArray};

        Game.create(dbObject)
            .exec(function (error, Game) {

                if (error) {
                    myResponse.code = -1;
                    myResponse.description = 'Error while create';
                }

                myResponse.code = 1;
                myResponse.description = "Success";
                myResponse.code = Game;

            });
        return myResponse;
    },
    playGame: function (req, res) {

        var objReq = req.params.all();

        var myResponse = {
            'code': 0,
            'description': 'Success',
            'data': []
        };

        // Get the socket ID from the reauest
        var socketId = sails.sockets.id(req);

        // Get the session from the request
        var session = req.session;

//        if (req.isSocket) {

        // This is the message from connected client
        // So add new conversation
        Game.update({gameId: objReq.gameId}, {gameArray: objReq.gameArray}).exec(function afterwards(err, updated) {

            // Get the socket ID from the reauest
            var socketId = sails.sockets.id(req);

            // Get the session from the request
            var session = req.session;

        });

    },
    updateGame: function (req, res) {
    }
};
module.exports = MainController;
