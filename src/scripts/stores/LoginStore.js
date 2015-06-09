var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var AppDispatcher = require('../base/AppDispatcher');
var AppConstants = require('../constantss/AppConstants');

_data = {
    users: [{login: 'q', password: 'q'}, {login: 'test', password: 'test'}]
};

var _currentUser;

//initial check loggedIn
var loggedIn = _data.users.some(function (item) {
    _currentUser = localStorage.getItem('currentUser') === item.login ? item.login : null;
    return !!_currentUser;
});

function changeUser(user) {
    _currentUser = user.login;
}

function clearUser() {
    _currentUser = null;
    localStorage.clear();
}

function login(data) {
    var login = data.login;
    var password = data.password;
    var user;

    _data.users.some(function (item) {
        if (item.login === login && item.password === password) {
            user = item;
        }
        return !!user;
    });

    if (user) {
        localStorage.setItem('currentUser', user.login);
        changeUser(user);
    }
}

var LoginStore = assign({}, EventEmitter.prototype, {
    getCurrentUser: function () {
        return _currentUser;
    },

    emitChange: function () {
        this.emit('change');
    },

    addChangeListener: function (callback) {
        this.on('change', callback);
    },

    removeChangeListener: function (callback) {
        this.removeListener('change', callback);
    }

});

AppDispatcher.register(function (payload) {
    var action = payload.action;

    switch (action.actionType) {
        case AppConstants.LOGOUT:
            clearUser();
            break;

        case AppConstants.LOGIN:
            login(action.data);
            break;

        default:
            return true;
    }

    LoginStore.emitChange();

    return true;
});

module.exports = LoginStore;