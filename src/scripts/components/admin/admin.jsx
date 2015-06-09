var LoginStore = require('../../stores/LoginStore');

var currentUser = LoginStore.getCurrentUser();

module.exports = React.createClass({
    displayName: 'Admin',

    contextTypes: {
        router: React.PropTypes.func
    },

    statics: {
        willTransitionTo: function(transition) {
            if (!LoginStore.getCurrentUser()) {
                transition.redirect('/signIn', {}, {'nextPath' : transition.path});
            }
        }
    },

    // Add change listeners to stores
    componentDidMount: function() {
        LoginStore.addChangeListener(this.handleLoginStore);
    },

    // Remove change listeners from stores
    componentWillUnmount: function() {
        LoginStore.removeChangeListener(this.handleLoginStore);
    },

    handleLoginStore: function() {
        var currentUser = LoginStore.getCurrentUser();
        if (!currentUser) {
            var router = this.context.router;
            router.replaceWith('/');
        }

    },

    render: function () {
        return (
            <div>Admin page. Redirected from successful signing or just type /admin in URL</div>
        )
    }
});
