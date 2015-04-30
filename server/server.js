Meteor.startup(function () {
	Meteor.publish('numbers', function(startAt) {
		return Numbers.find({ number: { $gte: (startAt||0) }}, {sort: {number: 1}});
    });
    
	Numbers.allow({
		insert: function() {
			return true;
		},
		fetch: ['number'],
	});
});
