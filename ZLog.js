var path = require('path');
var fs = require('fs');

var LOG_PATH = "",
    DIR_NAME = "";
var logging = function(type,msg){
    var d = new Date();
    ZLog.write(type,d.toLocaleDateString(),d.toLocaleString(),msg);
}
var ZLog = {
  /*可自定义日志文件的目录路径和名字
  *  ZLog.init({path:"/abc/ccc",name:"ZLog"})
  */
  init :  function(Obj){
      LOG_PATH = (Obj && Obj.path) ? Obj.path : path.parse(require.main.filename).dir;
      DIR_NAME = (Obj && Obj.name) ? Obj.name : "ZLog";
      LOG_PATH = path.normalize(LOG_PATH + "/"+DIR_NAME+"/");

      try{
        fs.accessSync(LOG_PATH, fs.R_OK | fs.W_OK);
      }catch(e){
          ZLog.mkdir();
      }

      try{
        fs.accessSync(LOG_PATH+"access/", fs.R_OK | fs.W_OK);
      }catch(e){
          ZLog.mkdir("access");
      }

      try{
        fs.accessSync(LOG_PATH+"error/", fs.R_OK | fs.W_OK);
      }catch(e){
          ZLog.mkdir("error");
      }

      try{
        fs.accessSync(LOG_PATH+"debug/", fs.R_OK | fs.W_OK);
      }catch(e){
          ZLog.mkdir("debug");
      }


  },
  mkdir : function(type){
    if(!LOG_PATH) return;
    var path =  (type) ? type : "";
    fs.mkdir(LOG_PATH+path, function(err){
        if(err) console.log(err);
    })
  },
  write : function(type,filename,time,msg){
    fs.appendFile(LOG_PATH+type+"/"+filename+".txt", time+"  "+msg+"\n", function (error) {
    	if (error) {
        console.error(error);
    	}
    });
  },
  access : function(msg){
    logging("access",msg);
  },
  error : function(msg){
    logging("error",msg);
  },
  debug : function(msg){
    logging("debug",msg);
  }
}

module.exports = ZLog;
