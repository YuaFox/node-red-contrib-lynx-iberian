module.exports = function(RED) {

    var events = {}

    function LynxInput(config) {
        RED.nodes.createNode(this,config)

        var node = this
        var server = RED.nodes.getNode(config.lynx)
        
        let botEvents = events[server.credentials.username]
        if(!botEvents){
            events[server.credentials.username] = {}
        }
        events[server.credentials.username][config.event] = [ node, server.credentials.password ]
    }
    
    
    
    RED.nodes.registerType("lynx-input", LynxInput)
    
    RED.httpNode.post(`/lynx/api/v1/event/:username/:event`, (req, res) => {
	    if(req.body.password === events[req.params.username][req.params.event][1]){
		    res.send(200, '')
		    events[req.params.username][req.params.event][0].send({
		        payload: {
		        	event: true
		        }
		    })
        }else{
    		res.send(401, '')
        }
    })
}
