module.exports = function(RED) {
    function LynxInput(config) {
        RED.nodes.createNode(this,config)

        var node = this
        var server = RED.nodes.getNode(config.lynx)

        RED.httpNode.post(`/lynx/api/v1/event/${server.credentials.username}/${config.event}`, (req, res) => {
            if(req.body.password === server.credentials.password){
                node.send({
                    res: res,
                    payload: {}
                })
            }else{
                res.send(401, '')
            }
        })
    }
    RED.nodes.registerType("lynx-input", LynxInput)
}