var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var Redirect = Router.Redirect;

var FluxApp = require('../fluxApp/fluxApp');
var TitleAction = require('../../actions/TitleAction');

var Main = require('../main/main');
var Contacts = require('../contacts/contacts');
var Profile = require('../profile/profile');
var SignIn = require('../signIn/signIn');
var Admin = require('../admin/admin');

var routes = (
    <Route name="app" path="/" handler={FluxApp}>

        <Route name="main" handler={Main}/>

        <Route name="contacts" handler={Contacts}/>
        <Route name="profile" handler={Profile}/>
        <Route name="signIn" handler={SignIn}/>
        <Route name="admin" handler={Admin}/>

        <Redirect from="main" to="/" />
    </Route>
);

Router.run(routes, function (Handler, state) {
    //show title depends on active page
    TitleAction.changeTitle(state.path);
    React.render(<Handler />, document.getElementById('page'));
});
