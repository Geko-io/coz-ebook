ServerHttp = require("./server/serverHttp.js");

port	= process.env.PORT || 9250;
host	= process.env.HOST || "127.0.0.1";
var server = new ServerHttp(host, port);
server.run();
