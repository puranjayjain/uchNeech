Hosts = new Mongo.Collection ('hosts');
Contacts = new Mongo.Collection ('contacts');
if (Meteor.isServer)
{
	var ping = Meteor.npmRequire('ping');
	var pinger = function ()
	{
		Hosts.find().forEach (
			function (host, index, hosts)
			{
				var ip = host['ip'];
				var pingBoundedCallback = Meteor.bindEnvironment (
					function (isAlive)
									{
										var date = new Date ();
										var wasAlive = function (host)
										{ //console.log (host);
											if (_.last (host.alive) > _.last (host.dead))
											{ //console.log ("true "+ host['ip']);
												return true;
											}
											else { return false;}
										};
										if (host['alive'].length || host['dead'].length)
										{
											if (host['alive'].length && host['dead'].length)
											{
												if (wasAlive (host) !== isAlive)
												{
													if (isAlive === true)
													{ console.log (host['ip']+ " alive");
														Hosts.update (host, {$push : {alive : date}});
													}
													else
													{ console.log (host['ip']+ " dead");
														Hosts.update (host, {$push : {dead : date}});
													}
												}
											}
											else if (host['alive'].length && !isAlive)
											{
												console.log ("second update dead "+host['ip']);
												Hosts.update (host, {$push : {dead : date}});
											}
											else if (host['dead'].length && isAlive)
											{
												console.log ("second update alive "+host['ip']);
												Hosts.update (host, {$push : {alive : date}});
											}
										}
										else if (isAlive)
										{ console.log ("first udpate "+host['ip']+ " alive");
											Hosts.update (host, {$push : {alive : date}});
										}
										else
										{ console.log ("first udpate "+host['ip']+ " dead");
											Hosts.update (host, {$push : {dead : date}});
										}
									}, function (e){throw e;})
				Meteor.wrapAsync (ping.sys.probe (ip , function (isAlive) {pingBoundedCallback (isAlive);}));
			})
	};
	
	var boundPinger = Meteor.bindEnvironment (pinger, function (e) {throw e;});
	Meteor.setInterval (boundPinger, 6000);
	// pinger();
}
