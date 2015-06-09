var Flux = require('flux');

var App = require('../app/app.jsx');

module.exports = React.createClass({
    displayName: 'FluxApp',

    render: function () {
        return (
            <App />
        )
    }
});