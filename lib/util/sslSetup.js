const conf = require("./config");

// Configuration key used to allow untrusted certificates
var CONFIG_KEY = "acceptUntrustedSSL";

/**
 * Configures ssl connections
 */
module.exports = {
    /**
     * Enable unauthorized ssl certs if configured by user
     */
    setupSSLConnections: () => {
        if (conf.get(CONFIG_KEY)) {
            process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
        }
    },

    /**
     * Setup ssl configuration to allow untrusted connection
     */
    allowUnstrustedSSLConnections: (allowed) => {
        conf.set(CONFIG_KEY, allowed);
        console.log("test" + allowed)
        if (allowed) {
            process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
        }
    }
};

