const path = require('path');

module.exports = {
    webpack: {
        configure: (webpackConfig, { paths }) => {
            const scopePluginIndex =
                webpackConfig.resolve.plugins.findIndex(
                    ({constructor}) =>
                        constructor &&
                        constructor.name === 'ModuleScopePlugin',
                );

            webpackConfig.resolve.plugins.splice(scopePluginIndex, 1);
            paths.appBuild = webpackConfig.output.path = path.resolve('../back-end/wwwroot');
            return webpackConfig;
        },
    },
    babel: {
        presets: ['@babel/preset-react'],
        loaderOptions: (babelLoaderOptions) => {
            return babelLoaderOptions;
        },
    },
};
