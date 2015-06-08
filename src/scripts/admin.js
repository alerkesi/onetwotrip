var Admin = React.createClass({
    statics: {
        willTransitionTo: function(transition) {
            if (!auth.loggedIn()) {
                transition.redirect('/signIn', {}, {'nextPath' : transition.path});
            }
        }
    },

    render: function () {
        return (
            <div>Admin page. Redirected from successful signing.</div>
        )
    }
});
