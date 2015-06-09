var Flux = require('flux');

var App = require('../app/app.jsx');

var TitleStore = require('../../stores/TitleStore');

module.exports = React.createClass({
    displayName: 'FluxApp',

    // Get initial state from stores
    getInitialState: function() {
        return {
            title: TitleStore.getTitle()
        };
    },

    // Add change listeners to stores
    componentDidMount: function() {
        TitleStore.addChangeListener(this.handleTitleStore);
    },

    // Remove change listeners from stores
    componentWillUnmount: function() {
        TitleStore.removeChangeListener(this.handleTitleStore);
    },

    handleTitleStore: function() {
        this.setState({
            title: TitleStore.getTitle()
        })
    },

    render: function () {
        return (
            <App title={this.state.title}/>
        )
    }
});