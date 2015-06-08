'use strict';

var App = React.createClass({
    getInitialState: function () {
        return {
            loggedIn: auth.loggedIn()
        };
    },

    setStateOnAuth: function () {
        this.setState({
            loggedIn: auth.loggedIn()
        });
    },

    componentWillMount: function () {
        auth.authChange = this.setStateOnAuth;
    },

    render: function () {
        return (
            <div className="app">
                <header>
                    <nav>
                        <ul>
                            <li className="navItem"><Link className="navLink" to="main">Main</Link></li>
                            <li className="navItem"><Link className="navLink" to="contacts">Contacts</Link></li>

                            {this.state.loggedIn ? (
                                <li className="navItem"><Link className="navLink" to="profile">Profile</Link></li>
                            ) : null}

                            <li className="navItem">
                                {this.state.loggedIn ?
                                    (
                                        <SignOut />
                                    ) :
                                    (
                                        <Link className="navLink" to="signIn">Sign in</Link>
                                    )
                                }
                            </li>
                        </ul>
                    </nav>
                </header>
                <RouteHandler />
            </div>
        );
    }
});

var Main = React.createClass({
    render: function () {
        return (
            <div>Main page</div>
        )
    }
});

var Contacts = React.createClass({
    render: function () {
        return (
            <div>Contacts</div>
        )
    }
});

var Profile = React.createClass({
    render: function () {
        return (
            <div>Profiles</div>
        )
    }
});

var Admin = React.createClass({
    render: function () {
        return (
            <div>Admin page. Redirected from successful signing.</div>
        )
    }
});

var SignIn = React.createClass({
    contextTypes: {
        router: React.PropTypes.func
    },

    getInitialState: function () {
        return {
            showError: false,
            textError: 'Incorrect login or password'
        }
    },

    handleSubmit: function (event) {
        event.preventDefault();
        var router = this.context.router;
        var login = React.findDOMNode(this.refs.login).value.trim();
        var password = React.findDOMNode(this.refs.password).value.trim();
        if (auth.login(login, password)) {
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
                <div className="overlay"></div>
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

var SignOut = React.createClass({
    contextTypes: {
        router: React.PropTypes.func
    },

    handleSignOut: function () {
        var router = this.context.router;
        auth.logout();
        router.replaceWith('/');
    },

    render: function () {
        return (
            <button onClick={this.handleSignOut}>Sign Out</button>
        )
    }
});

var routes = (
    <Route name="app" path="/" handler={App}>

        <DefaultRoute name="main" handler={Main}/>

        <Route name="contacts" handler={Contacts}/>
        <Route name="profile" handler={Profile}/>
        <Route name="signIn" handler={SignIn}/>
        <Route name="admin" handler={Admin}/>
    </Route>
);

Router.run(routes, function (Handler) {
    React.render(<Handler/>, document.getElementById('page'));
});