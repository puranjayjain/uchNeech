Meteor.startup (function ()
	{
		
	});
devices = new ReactiveVar (0);
states = new ReactiveVar (0);
selector = new ReactiveVar (0);
Template.tab.events (
	{
		'click a' : function (event, template)
		{
			template.$ ("a").removeClass ("active");
			$(event.target).addClass ("active");
			devices.set ( event.currentTarget.id);
			selector.set (event.currentTarget.id==="all" ? {} :{class : event.target.id });
		}
	});
Template.secondary.events (
	{
		'click a' : function (event, template)
		{
			template.$ ("a").removeClass ("active");
			$(event.currentTarget).addClass ("active");
			states.set (event.currentTarget.id);
		}
	});

Template.table.helpers (
	{
		'any' : function ()
		{
			var sel = selector.get();
			return Hosts.find(sel).count();
		},
		'showAlive' : function ()
		{ 
			var temp = states.get ();
			return (temp==5 || temp == 6);
		},
		'showDead' : function ()
		{ 
			var temp = states.get();
			return (temp==5 || temp == 7);
		},
		'alive' : function ()
		{
			var sel = selector.get();
			sel = (_.extend (sel, {state: 'alive'})); console.log (sel);
			return Hosts.find (sel);
		},
		'dead' : function ()
		{
			var sel = selector.get();
			sel = (_.extend (sel, {state: 'dead'}));console.log (sel);
			return Hosts.find (sel);
		}
	});
Template.cell.helpers (
	{
		'ip': function () { return this.ip;},
		'since' : function ()
		{
			var date = new Date();
			var one_min=1000*60*60;
			return (this['state']==='alive') ? (date - _.last (this['alive']))/one_min : (date - _.last (this['dead']))/one_min;
		}
	});
Template.body.helpers (
	{
		'selected' : function ()
		{
			return !(devices.get()=== 0 || states.get()===0);
		}
	});