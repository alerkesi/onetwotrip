var AppDispatcher = require('../dispatcher/AppDispatcher');
var TitleConstants = require('../constants/TitleConstants');

var TitleActions = {
  loadTitle: function(data) {
    AppDispatcher.handleAction({
      actionType: TitleConstants.LOAD_TITLE,
      data: data
    })
  }
};

module.exports = TitleActions;