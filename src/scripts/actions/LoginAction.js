var AppDispatcher = require('../base/AppDispatcher');
var AppConstants = require('../constantss/AppConstants');

module.exports = {
    logout: function () {
        AppDispatcher.handleViewAction({
            actionType: AppConstants.LOGOUT,
            data: null
        });
    },

    login: function (data) {
        AppDispatcher.handleViewAction({
            actionType: AppConstants.LOGIN,
            data: data
        });

    },

    cancelLogin: function() {
        var router = Router;
        router.goBack();
    }
};