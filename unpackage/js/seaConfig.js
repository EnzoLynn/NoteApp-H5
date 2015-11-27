'use strict';

var version = new Date();
var versionStr = version.getFullYear() + '' + (version.getMonth() + 1) + version.getDate();
seajs.config({
    base: "/",
    paths: {
        'image': '/image',
        'css': '/css',
        'js': '/js'
    },
    alias: {
        "jquery": "/dist/js/lib/jquery",
        "mui": "/dist/js/lib/mui"
    },
    map: [[/^(.*\.(?:css|js))(.*)$/i, '$1?v=' + versionStr + '']],
    charset: 'utf-8'
});