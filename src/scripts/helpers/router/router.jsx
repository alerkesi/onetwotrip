'use strict';

var React = require('react');
var Router = require('react-router');
var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var Redirect = Router.Redirect;

var App = require('../../components/app/app');
var Main = require('../../components/main/main');

var Contacts = require('../../components/contacts/contacts');
var Profile = require('../../components/profile/profile');
var SignIn = require('../../components/signIn/signIn');
var Admin = require('../../components/admin/admin');

var routes = (
    <Route name="app" path="/" handler={App}>

        <DefaultRoute name="main" handler={Main}/>

        <Route name="contacts" handler={Contacts}/>
        <Route name="profile" handler={Profile}/>
        <Route name="signIn" handler={SignIn}/>
        <Route name="admin" handler={Admin}/>

        <Redirect from="main" to="/" />
    </Route>
);

Router.run(routes, function (Handler) {
    React.render(<Handler/>, document.getElementById('page'));
});