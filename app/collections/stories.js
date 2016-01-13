Stories = new Meteor.Collection('stories');
Ground.Collection( Stories );

Stories.allow({
	update: function() {
		return !!Meteor.user();
	},
	remove: function() {
		return !!Meteor.user();
	},
	insert: function() {
		return true;
	}
});
