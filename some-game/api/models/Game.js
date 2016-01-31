/**
 * Game.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports.Game = {

    attributes: {
        'gameId': 'STRING',
        'userArray': {'user1': 'STRING', 'user2': 'STRING'},
        'gameArray': [
            {0: 'STRING', 1: 'STRING', 2: 'STRING'},
            {0: 'STRING', 1: 'STRING', 2: 'STRING'},
            {0: 'STRING', 1: 'STRING', 2: 'STRING'}
        ]
    }
};

