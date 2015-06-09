var AppDispatcher = require('../base/AppDispatcher');
var AppConstants = require('../constantss/AppConstants');
var TitleClient = require('../clients/TitleClient');

module.exports = {
    changeTitle: function (data) {
        AppDispatcher.handleViewAction({
            actionType: AppConstants.CHANGE_TITLE,
            data: data
        });

        TitleClient.writeTitle(data);
    }
};