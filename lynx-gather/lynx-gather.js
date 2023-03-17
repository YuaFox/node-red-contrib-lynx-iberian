const axios = require('axios')

module.exports = function(RED) {
    function LynxGather(config) {
        RED.nodes.createNode(this,config)

        var node = this
        var server = RED.nodes.getNode(config.lynx)

        node.on('input', function(msg) {
            axios.post(`http://${server.ipaddress}:${server.port}/api/v1/drivers/gatherer/${config.driver}`, msg.payload, { auth: server.credentials }).then(function (response) {
                msg.payload = response
                node.send(msg)
            }).catch(function (error) {
                console.log(error)
            })
        });
    }
    RED.nodes.registerType("lynx-gather", LynxGather);
}