_data = {
    users: [{login: 'q', password: 'q'}, {login: 'test', password: 'test'}]
};

//initial check loggedIn
var loggedIn = _data.users.some(function(item) {
    return localStorage.getItem('currentUser') === item.login;
});

module.exports = {
    data: {
        loggedIn: loggedIn,
        users: _data.users
    },

    authChange: function () {
        return this.data.loggedIn;
    },

    login: function (login, password) {
        var user;
        this.data.users.some(function(item) {
            if (item.login === login && item.password === password) {
                user = item;
            }
            return !!user;
        });
        if (user) {
            localStorage.setItem('currentUser', user.login);
            this.data.loggedIn = true;
            this.authChange(true);
            this.data.currentUser = user;
        }

        return this.data.loggedIn;
    },

    logout: function () {
        this.data.loggedIn = false;
        localStorage.clear();
        this.authChange(true);

        return this.data.loggedIn;
    },

    loggedIn: function () {
        return this.data.loggedIn;
    },

    getCurrentUser: function() {
        return this.data.currentUser;
    }
};