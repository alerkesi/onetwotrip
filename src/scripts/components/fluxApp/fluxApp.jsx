var Flux = require('flux');

var App = require('../app/app.jsx');

var TitleStore = require('../../stores/TitleStore');
var LoginStore = require('../../stores/LoginStore');

var LoginAction = require('../../actions/LoginAction');


module.exports = React.createClass({
    displayName: 'FluxApp',

    contextTypes: {
        router: React.PropTypes.func
    },

    // Get initial state from stores
    getInitialState: function() {
        return {
            title: TitleStore.getTitle(),
            currentUser: LoginStore.getCurrentUser()
        };
    },

    // Add change listeners to stores
    componentDidMount: function() {
        TitleStore.addChangeListener(this.handleTitleStore);
        LoginStore.addChangeListener(this.handleLoginStore);
    },

    // Remove change listeners from stores
    componentWillUnmount: function() {
        TitleStore.removeChangeListener(this.handleTitleStore);
        LoginStore.removeChangeListener(this.handleLoginStore);
    },

    handleLoginStore: function() {
        this.setState({
            currentUser: LoginStore.getCurrentUser()
        });

        var router = this.context.router;

    },

    handleTitleStore: function() {
        this.setState({
            title: TitleStore.getTitle()
        })
    },

    render: function () {
        return (
            <div onClick={this.handleLogout}>
                <App title={this.state.title} currentUser={this.state.currentUser}/>
            </div>
        )
    }
});