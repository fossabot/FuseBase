let Module = require("../../src/server/api/Module.js");

let M = new Module();

M.addControlPanelEvent("RemoteExecModule_Send", (data, masterSocket, slaveSockets) => {
	slaveSockets.forEach(socket => {
		M.executeRemoteFuncFromThisModule(socket, "execRemote", data, out => masterSocket.emit("RemoteExecModule_Receive", out));
	});
});

M.addRemoteFunction("execRemote", function(code, debug) {
	return eval(code);
});

M.setAutoRunStatus(false);

module.exports = M;