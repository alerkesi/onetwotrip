var Link = Router.Link;
var RouteHandler = Router.RouteHandler;

var SignOut = require('../signOut/signOut');

require('./styles/app.css');

module.exports = React.createClass({
    displayName: 'App',

    render: function () {
        return (
            <div className="app">
                <header>
                    <nav>
                        <ul>
                            <li className="navItem"><Link className="navLink" to="main">Main</Link></li>
                            <li className="navItem"><Link className="navLink" to="contacts">Contacts</Link></li>

                            {this.props.currentUser ? (
                                <li className="navItem"><Link className="navLink" to="profile">Profile</Link></li>
                            ) : null}

                            <li className="navItem">
                                {this.props.currentUser ?
                                    (
                                        <SignOut/>
                                    ) :
                                    (
                                        <Link className="navLink" to="signIn">Sign in</Link>
                                    )
                                }
                            </li>
                        </ul>
                    </nav>
                </header>
                <RouteHandler/>
                <div><br/><br/><br/>This is currentUser updated from store: {this.props.currentUser}</div>
                <div>This is title updated from store: {this.props.title}</div>
            </div>
        );
    }
});