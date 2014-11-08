var pinging = function ()
{
	Meteor.call ('pinger', function (error, result )
	{
		if (error) {console.log (error);} 
		else
		{
			Session.set ('result', result);
		}
	});
};

Meteor.setInterval (pinging, 6000);
Template.body.helpers (
	{
		'isAlive' : function ()
		{
				var result = Session.get ('result');
				if (result)
				{
					return result[true];
				}
		},
		'isDead' : function ()
		{
			var result = Session.get ('result');
			if (result)
			{
				return result[false];
			}
		},
		'host' : function ()
		{
			return this;
		}
	});
Template.body.events (
	{
		'click #addHost' : function (event, template)
		{
			Meteor.call ('addHost', $("#newHost").val(), function (error, result)
				{
					if (error)
					{
						console.log (error);
					}
					else 
					{
						document.getElementById("newHostForm").reset();
					}
				});
		}
	});