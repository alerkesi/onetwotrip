var auth = require('../../base/auth');

module.exports = React.createClass({
    displayName: 'Admin',
    statics: {
        willTransitionTo: function(transition) {
            if (!auth.loggedIn()) {
                transition.redirect('/signIn', {}, {'nextPath' : transition.path});
            }
        }
    },

    render: function () {
        return (
            <div>Admin page. Redirected from successful signing or just type /admin in URL</div>
        )
    }
});
