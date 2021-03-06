/**
 * File for small collections of helpers
 * Move large helpers and stuff into client/features/feature.js
 */
Handlebars.registerHelper('storyThemes', function(story) {
	if( story ) {
		return Themes.find({
			_id: {
				$in: story.themes
			}
		});
	}
	return [];
});

// this should take unsafe strings and make them classy.
Handlebars.registerHelper('classify', function( str, prefix ) {
	prefix = typeof prefix === 'string' ? prefix : 'class';
	return prefix + '_' + (typeof str === 'string' ? str : '').replace(/[^a-z0-9]/g, function( s ) {
		// get the character code
		var c = s.charCodeAt(0);
		// space
		if( c === 32 ) {
			return '-';
		}
		// uppercase
		if( c >= 65 && c <= 90 ) {
			return '_' + s.toLowerCase();
		}
		// convert to character code
		// for symbols ( so $ would become '__24' )
		return '__' + ('000' + c.toString(16)).slice(-4);
	});
});

Template.storiesList.helpers({
	loggedIn: function() {
		return !!Meteor.user();
	},
	empty: function() {
		return this.stories.count() === 0;
	},
	publishedClass: function() {
		if( !this.published ) {
			return 'not-published';
		}
	},
	name: function() {
		var template = Template.instance();
		Meteor.defer(function() {
			template.$('.truncated').trunk8({ lines: 5, tooltip: false});
		});
		return this.name;
	}
});

/**
 * themes helpers
 */
Template.themes.helpers({
	themes: function() {
		var themes = Themes.find().fetch();
		var byWeight = themes.slice(0);
		byWeight.sort(function(a,b) {
		    return a.weight - b.weight;
		});

		return byWeight;
	}
});

Template.theme.helpers({
	empty: function() {
		return this.stories.count() === 0;
	},
	names: function() {
		return Themes.find({
			_id: {
				$in: this.ids
			}
		});
	}
});


// helper to display the errors from the session
Template.errors.helpers({
	errors: function() {
		return Session.get('errors');
	}
});

// the destroy method clears errors so they are not there 
// when returning to the page
Template.errors.destroyed = function(){
	Session.set('errors', null);
};

Template.message.helpers({
	message: function() {
		return Session.get('message');
	}
});

Template.message.destroyed = function(){
	Session.set('message', null);
};

Template.allStories.helpers({
	formatForDownload: function() {
		return JSON.stringify( _.map( this.stories.fetch(), function( story ) {
			return _.omit( story, '_id' );
		}));
	}
});

Template.inspiringRadios.helpers({
	checked: function() {
		var index = _.indexOf( ReactiveStore.get('inspiring') || [], this._id );
		return index > -1 ? 'checked' : '';
	},

	notChecked: function() {
		var index = _.indexOf( ReactiveStore.get('inspiring') || [], this._id );
		return index > -1 ? '' : 'checked';
	}
});
