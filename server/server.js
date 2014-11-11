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
state = new Object (); state['true'] = []; state['false'] = [];
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

}
var ping = Meteor.npmRequire('ping');
var hosts = ['127.0.0.1', 'google.com', 'facebook.com'];
Meteor.methods (
	{
		'pinger' : function ()
		{  
			_.each (hosts, function(host){
			    ping.sys.probe(host, function(isAlive){
			        adder (host, isAlive);
			    }); //console.log (state); 
			});
			// console.log (state);
			return state;
		},
		'addHost' : function (host)
		{
			check (host, String);
			hosts.push(host);
		}
	});
