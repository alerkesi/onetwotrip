var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var RouteHandler = Router.RouteHandler;

var SignOut = require('../signOut/signOut');

var auth = require('../../shared/auth');

require('./styles/app.css');

var TitleStore = require('../../stores/TitleStore');

module.exports = React.createClass({
    displayName: 'App',

    getInitialState: function () {
        return {
            loggedIn: auth.loggedIn(),
            title: TitleStore.getTitle()
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


