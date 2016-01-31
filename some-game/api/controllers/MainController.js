/**
 * UserController
 *
 * @description :: Server-side logic for managing user
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var MainController = {
    register: function (req, res) {
//        console.log('Reaching server properly');
        var params = req.params.all();
//        var socketId = sails.sockets.id(req);
        var socket = sails.io.of('/register');

        socket.on('connection', function (socket) {
//            console.log(socket);
//            socket.emit('hi2nd','Anuj on server');
//            socket.emit('hi','jitu on server');

            socket.on('hi', function (name) {
                console.log('client called server. 1st hi.='+name);
            });

            socket.on('hi2nd', function (name) {
                console.log('client called server. 2nd hi.='+name);
            });
            socket.on('disconnect', function(name){
                console.log(name+' disconnected');
            });
        });

//        sails.sockets.on('hi', function(name){
//            console.log('client called server. 1st hi');
//        });
//
//        sails.sockets.on('hi2nd', function(name){
//            console.log('client called server. 2nd hi');
//        });
//
//        socket.on('disconnect', function(name){
//            console.log('someone disconnected');
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
        console.log("starting");
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

