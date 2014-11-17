/*var pingApi = Meteor.npmRequire ('ping-lite');
var targets = ["127.0.0.1", "8.8.8.8"];
var ping = new Array();
console.log ("hi");
for (var i = 0; i < targets.length; i++) {
    ping[i] = new pingApi (targets[i]);
    ping[i].on('error', function(err) {
      console.log('uhoh: ',err);
    });

    ping[i].on('result', function(ms) {
      console.log(this._host+' responded in '+ms+'ms.');
    });
    ping[i].start ();
}*/
/*state = new Object (); state['true'] = []; state['false'] = [];
var adder = function (host, isAlive)
{
	if (! _.contains(state[isAlive], host))
	{
		state[isAlive].push(host);
		if (_.contains(state[!isAlive], host))
		{
			state[!isAlive] = _.without (state[!isAlive], host);
		}
	}

}*/
Meteor.startup (function ()
{
	hosts = Hosts.find().fetch();
	if (!hosts.length)
	{
		Hosts.insert ({ip: "google.com", alive:[], dead:[]});
		Hosts.insert ({ip: "facebook.com", alive:[], dead:[]});
		Hosts.insert ({ip: "yahoo.com", alive:[], dead:[]});
		Hosts.insert ({ip: "xyz.com", alive:[], dead:[]});
		Hosts.insert ({ip: "127.0.0.1", alive:[], dead:[]});
		Hosts.insert ({ip: "192.168.50.53", alive:[], dead:[]});
	}
})

// var hosts = Hosts.find().fetch();
Meteor.methods (
	{
		/*'pinger' : function ()
		{  
			_.each (hosts, function(host){
			    ping.sys.probe(host, function(isAlive){
			        adder (host, isAlive);
			    }); //console.log (state); 
			});
			// console.log (state);
			return state;
		},*/
		'addHost' : function (host)
		{
			check (host, String);
			hosts.push(host);
		}
	});
var Future = Npm.require('fibers/future');
var fut = new Future();
// var bound_callback = Meteor.bindEnvironment(probe_callback);

/*var pinger = function ()
{
	var boundCallback = Meteor.bindEnvironment (
		function (isAlive) {
				host = hostVar.get();
					

				}, function (e) {throw e;});
	hostVar = new Meteor.EnvironmentVariable;
	// hosts = Hosts.find().fetch();
	_.each (hosts, function (host) {
		hostVar.withValue (host, function ()
		{
			ping.sys.probe (host['ip'], boundCallback);
		});
	});
}
;*/


/*var wrapped = Async.wrap (function () {Meteor.setInterval (pinger, 6000);});
wrapped();*/
/**/

