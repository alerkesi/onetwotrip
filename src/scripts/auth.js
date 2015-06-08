var auth = {
    data: {
        loggedIn: false,
        users: [{login: 'q', password: 'q'}, {login: 'test', password: 'test'}]
    },

    authChange: function () {
        return this.data.loggedIn;
    },

    login: function (login, password) {
        if (login === this.data.users[0].login && password === this.data.users[0].password) {
            this.data.loggedIn = true;
            auth.authChange(true);
        }

        return this.data.loggedIn;
    },

    logout: function () {
        this.data.loggedIn = false;
        auth.authChange(true);

        return this.data.loggedIn;
    },

    loggedIn: function () {
        return this.data.loggedIn;
    }
};