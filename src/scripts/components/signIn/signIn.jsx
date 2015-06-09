var Auth = require('../../base/Auth');

module.exports = React.createClass({
    statics: {
        willTransitionTo: function(transition) {
            if (Auth.loggedIn()) {
                transition.redirect('/main');
            }
        }
    },

    displayName: 'SignIn',

    contextTypes: {
        router: React.PropTypes.func
    },

    getInitialState: function () {
        return {
            showError: false,
            textError: 'Incorrect login or password'
        }
    },

    handleClose: function() {
        var router = this.context.router;
        router.goBack();
    },

    handleSubmit: function (event) {
        event.preventDefault();
        var router = this.context.router;
        var login = React.findDOMNode(this.refs.login).value.trim();
        var password = React.findDOMNode(this.refs.password).value.trim();
        if (Auth.login(login, password)) {
            React.findDOMNode(this.refs.login).value = '';
            React.findDOMNode(this.refs.password).value = '';
            this.setState({
                showError: false
            });

            router.replaceWith('/admin');
        } else {
            this.setState({
                showError: true
            });
        }
    },

    render: function () {
        return (
            <div>
                <div className="overlay" onClick={this.handleClose}></div>
                <div className="popup">
                    <h1>Sign in</h1>

                    <form onSubmit={this.handleSubmit}>
                        {this.state.showError && (
                            <div><span ref="validationError" className="validation--error">{this.state.textError}</span>
                            </div>
                        )}
                        <div><input type="text" placeholder="Enter login" ref="login"/></div>
                        <div><input type="password" placeholder="Enter password" ref="password"/></div>
                        <div><input type="submit" value="Sign in"/>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
});

