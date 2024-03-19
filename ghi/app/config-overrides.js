const { override } = require('customize-cra');

module.exports = override(
    // Your custom webpack configuration adjustments here
    // For example, to modify the webpack-dev-server settings:
    (config, env) => {
        // Be careful with this, as you're directly modifying the internal config
        if (config.devServer) {
            config.devServer.setupMiddlewares = (middlewares, devServer) => {
                // Custom middleware logic
                return middlewares;
            };
        }
        return config;
    },
);
