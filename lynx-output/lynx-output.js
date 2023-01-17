module.exports = function(RED) {
    function LynxOutput(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        node.on('input', function(msg) {
            
        });
    }
    RED.nodes.registerType("lynx-output", LynxOutput);
}
