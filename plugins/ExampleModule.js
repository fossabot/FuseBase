let Module = require('../src/server/Module.js');

let ExampleModule = new Module();

ExampleModule.addDependencies("https://cdn.rawgit.com/blueimp/JavaScript-MD5/da202aebc0436c715e074525affc4e9416309fc3/js/md5.min.js");

ExampleModule.setMainFunction(function(module, socket, config) {
	socket.executeFunc(module, "md5Hash", (function() {let out = []; for (let i = 0; i < 1000; i++) {out.push(Math.random())} return out})(), function(out) {
		console.log(out);
	});
});

ExampleModule.addRemoteFunction("md5Hash", function(args, debug) {
	let out = [];
	
	if (args instanceof Function) args = args();
	
	for (let i = 0; i < args.length; i++) {
		out.push(md5(args[i]));
	}
	
	return out;
});

module.exports = ExampleModule;