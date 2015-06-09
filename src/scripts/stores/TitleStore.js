var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var AppDispatcher = require('../base/AppDispatcher');

var _title = {name: 'OneTwoTrip'};

function loadTitle(data) {
  _title = data.title;
}

var TitleStore = assign({}, EventEmitter.prototype, {

  getTitle: function() {
    return _title;
  },

  emitChange: function() {
    this.emit('change');
  },

  addChangeListener: function(callback) {
    this.on('change', callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener('change', callback);
  }

});

AppDispatcher.register(function(payload) {
  var action = payload.action;
  var text;

  switch(action.actionType) {
    case 'CHANGE_TITLE':
      loadTitle(action.data);
      break;

    default:
      return true;
  }

  TitleStore.emitChange();

  return true;

});

module.exports = TitleStore;