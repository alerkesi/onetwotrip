var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var AppDispatcher = require('../base/AppDispatcher');
var AppConstants = require('../constants/AppConstants');

var _title = 'OneTwoTrip';

function changeTitle(data) {
    _title = data;
}

var TitleStore = assign({}, EventEmitter.prototype, {

    getTitle: function () {
        return _title;
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
        case AppConstants.CHANGE_TITLE:
            changeTitle(action.data);
            break;

        default:
            return true;
    }

    TitleStore.emitChange();

    return true;

});

module.exports = TitleStore;