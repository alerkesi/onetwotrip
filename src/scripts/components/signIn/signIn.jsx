var Auth = require('../../base/Auth');

require('./styles/signIn.css');

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
        var loginInput = React.findDOMNode(this.refs.login);
        var passwordInput = React.findDOMNode(this.refs.password);
        var login = loginInput.value.trim();
        var password = passwordInput.value.trim();
        if (Auth.login(login, password)) {
            loginInput.value = '';
            passwordInput.value = '';
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
                        <div><input type="text" placeholder="Enter login" ref="login" className="formInput" /></div>
                        <div><input type="password" placeholder="Enter password" ref="password" className="formInput" /></div>
                        <div><button type="submit">Sign in</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
});

