Meteor.startup (function ()
	{
		Session.setDefault ('view', 'welcome');
	});
var first, flip;
devices = new ReactiveVar (0);
states = new ReactiveVar (0);
selector = new ReactiveVar (0);

Template.navbar.events (
	{
		'click a.pull-left' : function ()
		{ 
			Session.set ('view', 'welcome');
		}
	});
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
			sel = (_.extend (sel, {state: 'alive'}));
			return Hosts.find (sel);
		},
		'dead' : function ()
		{
			var sel = selector.get();
			sel = (_.extend (sel, {state: 'dead'}));
			return Hosts.find (sel);
		}
	});
Template.cell.helpers (
	{
		'ip': function () { return this.ip;},
		'since' : function ()
		{
			var date = new Date().getTime();
			var one_min=1000*60;
			var xyz = (this['state']==='alive') ? (date - _.last (this['alive']).getTime()) : (date - _.last (this['dead']).getTime());
			// console.log (xyz+ " - "+ this['ip']);
			return Math.round (xyz/one_min);
		}
	});

Template.cell.events (
	{
		'click li' : function (event, template )
		{
			Session.set ('view', 'history');
			Session.set ('selectedHost', this);
		}
	});
Template.history.helpers (
	{
		'ip' : function ()
		{
			return Session.get ('selectedHost')['ip'];
		},
		'hist' : function ()
		{ 
			var host = Session.get ('selectedHost');
			hist = _.sortBy(_.union (host['alive'], host['dead']), function (num) {return num;});
			return hist;
		},
		which : function ()
		{
			var host = Session.get ('selectedHost'); 
			if (first === undefined)
			{  first = (_.first (host['alive']) < _.first (host ['dead']))? 'up': 'down';}
			if (first ==='up') {flip = 'fa-arrow-up'; first = null;}
			else if (first === 'down') {flip = 'fa-arrow-down'; first = null;}
			else if  (flip === 'fa-arrow-down') {flip = 'fa-arrow-up';}
			else if (flip === 'fa-arrow-up') {flip = 'fa-arrow-down';}
			return flip;
		}
	});
Template.body.helpers (
	{
		'selected' : function ()
		{
			return !(devices.get()=== 0 || states.get()===0);
		}
	});

Template.registerHelper ('state', function (status)
			{ 
				return (Session.equals ('view', status));
			});