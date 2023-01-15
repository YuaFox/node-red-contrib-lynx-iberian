const axios = require('axios')

module.exports = function(RED) {
    function LynxExplorer(config) {
        RED.nodes.createNode(this,config)

        var node = this
        var server = RED.nodes.getNode(config.lynx)

        node.on('input', function(msg) {
            axios.get(`http://${server.ipaddress}:${server.port}/api/v1/drivers/explorer/${config.driver}`, { auth: server.credentials }).then(function (response) {
                msg.payload = response.data
                node.send(msg)
            }).catch(function (error) {
                console.log(error)
            })
        });
    }
    RED.nodes.registerType("lynx-explorer", LynxExplorer)
}