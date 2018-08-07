const path = require('path');



module.exports = {
    dev:{

    },
    build:{
        index: path.resolve(__dirname, '../dist/index.html'),
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
    },


    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot:path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',

};