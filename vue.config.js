// Inside vue.config.js
module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ?
        '' : '/',
    devServer: {
        open: true,
        host: '127.0.0.1',
        port: 3000,
    },
    // ...other vue-cli plugin options...
    pwa: {
        appleMobileWebAppCapable: 'yes',
        appleMobileWebAppStatusBarStyle: 'black',
        // configure the workbox plugin
        workboxPluginMode: 'InjectManifest',
        workboxOptions: {
            // swSrc is required in InjectManifest mode.
            swSrc: 'src/service-worker.js',
            // ...other Workbox options...
        }
    }
}