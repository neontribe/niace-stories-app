/**
 * This is the config collection
 * the data takes the format:
 * {
 * 		_id: 'name of the config item',
 * 		value: 'theValue'
 * }
 */
Config = new Meteor.Collection('config');
Ground.Collection( Config );

Config.allow({
	insert: function() {
		return !!Meteor.user();
	},
	update: function() {
		return !!Meteor.user();
	},
	remove: function() {
		return false;
	},
	fetch: ['owner']
});