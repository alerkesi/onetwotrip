var LoginAction = require('../../actions/LoginAction');

module.exports = React.createClass({
    displayName: 'SignOut',

    handleSignOut: function () {
        LoginAction.logout();
    },

    render: function () {
        return (
            <button onClick={this.handleSignOut}>Sign Out</button>
        )
    }
});

