

Template.numberItem.events({
	'mouseout': function(event, tpl) {
	},
	'mouseover': function(event, tpl) {
	},
	'click': function(event, tpl) {
		Router.go('/n/'+this.number);
	}
});

Template.showNumber.events({
	'infiniteScroll .scroll-panel': function(event, tpl) {
		console.log('please load more stuff at end');
	},
})

Template.numberItem.helpers({
	is_blank: function(event, tpl) {
		return !this._id ? " blank" : "";
	}
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