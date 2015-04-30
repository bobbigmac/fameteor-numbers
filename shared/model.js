Numbers = new Meteor.Collection('numbers');

Router.configure({
	layoutTemplate: 'layout',
	notFoundTemplate: 'notFound',
	loadingTemplate: 'loading'
});

Router.onAfterAction(function(){
	var newTitle = false;
	if(this.route.options && this.route.options.title)
	{
		if(typeof(this.route.options.title) == 'function') {
			newTitle = this.route.options.title.call(this);
		}
		else if(typeof(this.route.options.title) == 'string')
		{
			newTitle = this.route.options.title;
		}
	}
	if(newTitle && typeof(newTitle) == 'string')
	{
		document.title = newTitle;
	}

    //document.title = this.route.options.title.replace(/_/g,' ') + '';
});

Router.map(function() {
	this.route('showNumber', {
		path: '/n/:_id', 
		data: function() {
    		return (this && this.params && this.params._id) || 0;
		},
		title: function() {
			return 'Number: '+this.params._id;
		}
	});

	this.route('showNumbers', { path: '/', title: 'Numbers! Welcome' });
});