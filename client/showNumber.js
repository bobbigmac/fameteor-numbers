
var Transform = famous.core.Transform;
var StateModifier = famous.core.StateModifier;
var spring = new famous.transitions.SpringTransition({
	//options
});

FView.registerView("HeaderFooterLayout", famous.views.HeaderFooterLayout);
FView.registerView("FlexibleLayout", famous.views.FlexibleLayout);

Template.numberItem.events({
	'mouseout': function(event, tpl) {
		return false;
		var fview = FView.from(tpl);

		// Set origin to center, and align middle left
		//fview.modifier.setScale(1);
		//fview.modifier.setOpacity(1, spring);
		var trans = Transform.scale(1, 1, 1);
		fview.modifier.setTransform(trans, spring);
	},
	'mouseover': function(event, tpl) {
		return Session.set('lastHovered', this.number);
		var fview = FView.from(tpl);

		// Set origin to center, and align middle left
		//fview.modifier.setScale(2);
		//fview.modifier.setOpacity(0.2, spring);
		var trans = Transform.scale(2, 2, 2);
		fview.modifier.setTransform(trans, spring);
	},
	'click': function(event, tpl) {
		console.log('clicked', this.number);
		Session.set('lastClicked', this.number);
		Router.go('/n/'+this.number);
	}
});

Template.numberItem.helpers({
	is_blank: function(event, tpl) {
		return !this._id ? " blank" : "";
	}
});

Template.showNumber.helpers({
	hoverTransform: function(event, tpl) {
		var number = (this && this[0] && this[0].number) || false;
		//console.log(number, Session.get('lastHovered'), Session.equals('lastHovered', number));
		var s = Session.equals('lastHovered', number) ? 2 : 1;
		return Transform.scale(s, s, s);
	},
	spring: function(event, tpl) {
		return spring;
	},
	// nudge: function(event, tpl) {
	// 	return { curve: 'easeIn', duration: 1000 };
	// }
	// ratios: function(e, t) {
	// 	console.log('hello', this, e, t);
	// 	return [true,true,true,true,true,true,true,true,true,true,true];
	// }
});
Template.showNumber.events({
	// 'infiniteScroll .scroll-panel': function(event, tpl) {
	// 	console.log('please load more stuff at end');
	// },
});

var minStartAt = 0, maxStartAt = 0;
Template.showNumber.helpers({
	numbers: function(event, tpl) {
		Session.set('startAt', (this && parseInt(this)) || 0);

		var startAt = Session.get('startAt');
		var rangeTo = 40;
		var numbers = [];
		for(var pos=0, i=startAt-rangeTo; i<startAt+rangeTo; pos++, i++)
		{
			var matches = Numbers.find({ number: i+1 });
			numbers[pos] = (matches && matches.count() > 0) ? matches.fetch() : [{ number: i+1 }];
		}
		return numbers;
	}
});