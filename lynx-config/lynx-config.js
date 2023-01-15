module.exports = function (RED) {
    function LynxConfig(config) {
        RED.nodes.createNode(this, config);

        this.ipaddress = config.ipaddress;
        this.port = config.port;
        if (this.credentials) {
            this.username = this.credentials.username;
            this.password = this.credentials.password;
        }
    }

    RED.nodes.registerType("lynx-config", LynxConfig, {
        credentials: {
            username: {type: "text"},
            password: {type: "password"}
        }
    });
};