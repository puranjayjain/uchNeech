Meteor.startup (function ()
{
	style = document.createElement ("link");
	$(style).attr ('rel','stylesheet');
	platform = navigator.userAgent? navigator.userAgent : null;
			if (platform)
			{
				if (/android/i.test(platform))
				{
					 $(style).attr ('href', '/lib/bootcards-android-lite.css');
				}
				else if (/iPhone|iPad|iPod/i.test(platform))
				{
					 $(style).attr ('href', '/lib/bootcards-ios-lite.css');
				}
				else
				{
					 $(style).attr ('href', '/lib/bootcards-desktop-lite.css');
				}
			}
			$('head').append ($(style));
})
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
