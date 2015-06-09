var Auth = require('../../base/Auth');

module.exports = React.createClass({
    displayName: 'SignOut',
    contextTypes: {
        router: React.PropTypes.func
    },

    handleSignOut: function () {
        var router = this.context.router;
        Auth.logout();
        router.replaceWith('/');
    },

    render: function () {
        return (
            <button onClick={this.handleSignOut}>Sign Out</button>
        )
    }
});

