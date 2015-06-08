var AppDispatcher = require('../base/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var TitleConstants = require('../constants/TitleConstants');

var _title = {name: 'OneTwoTrip'};

function loadTitle(data) {
  _title = data.title;
}

// Merge our store with Node's Event Emitter
var TitleStore = merge(EventEmitter.prototype, {

  // Returns all title
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

// Register dispatcher callback
AppDispatcher.register(function(payload) {
  var action = payload.action;
  var text;
  // Define what to do for certain actions
  switch(action.actionType) {
    case TitleConstants.LOAD_TITLE:
      // Call internal method based upon dispatched action
      loadTitle(action.data);
      break;

    default:
      return true;
  }

  // If action was acted upon, emit change event
  TitleStore.emitChange();

  return true;

});

module.exports = TitleStore;