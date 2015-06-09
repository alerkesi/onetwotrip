var AppDispatcher = require('../base/AppDispatcher');

module.exports = {
  changeTitle: function(data) {
    AppDispatcher.handleAction({
      actionType: 'VIEW_ACTION',
      data: data
    })
  }
};