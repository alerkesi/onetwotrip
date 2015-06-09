var Link = Router.Link;
var RouteHandler = Router.RouteHandler;

var SignOut = require('../signOut/signOut');

var Auth = require('../../base/Auth');

require('./styles/app.css');

module.exports = React.createClass({
    displayName: 'App',

    getInitialState: function () {
        return {
            loggedIn: Auth.loggedIn()
        };
    },

    setStateOnAuth: function () {
        this.setState({
            loggedIn: Auth.loggedIn()
        });
    },

    componentWillMount: function () {
        Auth.authChange = this.setStateOnAuth;
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
                <div>This is title updated from store: {this.props.title}</div>
            </div>
        );
    }
});