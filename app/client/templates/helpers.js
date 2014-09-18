Template.stories.helpers({
	stories: function() {
		return Stories.find({}, {sort: {submitted: -1}});
	}
});

Template.manage.helpers({
	stories: function() {
		return Stories.find();
	}
});

Template.manageitem.helpers({
	themes: function() {
		return Themes.find();
	},
	keywords: function( themeName ) {
		return Themes.find({ themeName: themeName }, {fields: {keywords: 1}});
	},
	currentTheme: function() {
		return this.story.theme;
	},
	checked: function() {
		return this.story.published ? 'checked': '';
	},
	selected: function(parentContext) {
		return this.themeName === parentContext.story.theme ? 'selected' : '';
	},
	themeValue: function() {
		return this.story.theme;
	},
	hasTheme: function() {
		debugger;
		return _.indexOf(this.story.keywords || [], this);
	}
});

/**
 * themes helpers
 */
Template.themes.helpers({
	themes: function() {
		return Themes.find();
	}
});

Template.theme.helpers({
	empty: function() {
		return this.stories.count() === 0;
	}
});
/***************************/

/**
 * header helpers
 */
Template.header.helpers({
	loggedIn: function() {
		return Meteor.user();
	}
});
/***************************/
