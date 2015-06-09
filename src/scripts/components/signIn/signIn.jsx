var LoginAction = require('../../actions/LoginAction');
var LoginStore = require('../../stores/LoginStore');

require('./styles/signIn.css');

module.exports = React.createClass({
    statics: {
        willTransitionTo: function (transition) {
            if (LoginStore.getCurrentUser()) {
                transition.redirect('/admin');
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
        if (currentUser) {
            this.setState({
                showError: false
            });
            var router = this.context.router;
            router.replaceWith('/admin');
        } else {
            this.setState({
                showError: true
            })
        }

    },

    handleClose: function () {
        var router = this.context.router;
        if (!router.goBack()) {
            router.replaceWith('/')
        }
    },

    handleSubmit: function (event) {
        event.preventDefault();
        var loginInput = React.findDOMNode(this.refs.login);
        var passwordInput = React.findDOMNode(this.refs.password);
        var login = loginInput.value.trim();
        var password = passwordInput.value.trim();

        LoginAction.login({login: login, password: password});
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
                        <div><input type="text" placeholder="Enter login" ref="login" className="formInput"/></div>
                        <div><input type="password" placeholder="Enter password" ref="password" className="formInput"/>
                        </div>
                        <div>
                            <button type="submit">Sign in</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
});

