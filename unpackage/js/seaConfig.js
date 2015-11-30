'use strict';

var version = new Date();
var versionStr = version.getFullYear() + '' + (version.getMonth() + 1) + version.getDate();
seajs.config({
    base: "/",
    paths: {
        'image': '../image',
        'css': '../css',
        'js': '../js'
    },
    alias: {
        "jquery": "./lib/jquery",
        "mui": "./lib/mui",
        "react": "./lib/react",
        "react-dom": "./lib/react-dom"
    },
    map: [[/^(.*\.(?:css|js))(.*)$/i, '$1?v=' + versionStr + '']],
    charset: 'utf-8'
});