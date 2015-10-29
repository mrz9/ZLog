var ZLog = require('ZLog.js');

    ZLog.init();//e.g {path:__dirname,name:"ZLog"} 可配置日志目录的路径以及目录的名字
    ZLog.access("成功了耶");
    ZLog.error("这是个错误日志，真的是个错误日志");
    ZLog.debug("我是调试信息，我是调试信息，我是调试信息，我是调试信息，我是调试信息，我是调试信息");
