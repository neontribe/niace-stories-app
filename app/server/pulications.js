'use strict';

// TODO 
var pageSize = 10;

Meteor.publish('stories', function( loggedIn, query, options ) {
	var page = options && options.page || 0;
	query = query || {};
	if( !loggedIn ) {
		query.published = true;
	}

	if( options ) {
		options = _.omit( options, 'page' );
		options = _.extend({
			sort: {
				submitted: -1
			},
			skip: page * pageSize,
			limit: pageSize
		}, options );
	} else {
		options = {
			sort: {
				submitted: -1
			}
		};
	}

	return Stories.find(query, options);
});

Meteor.publish('themes', function() {
	return Themes.find();
});

// Perhaps look to remove these fixture blocks when releasing?..
if( Stories.find().count() === 0 ) {
	try { // 
		console.log( 'Attempting to import stories from private/data/stories.json' );
		var stories = JSON.parse( Assets.getText('data/stories.json') );
		_.each( stories, function( story, i ) {
			console.log( 'Importing story ' + (i + 1) + '/' + stories.length );
			Stories.insert( story );
		});
	} catch(e) {
		console.log( 'couldn\'t load private/data/stories.json' );
	}
}

// Fixture for themes if database empty
if( Themes.find().count() === 0 ) {
	try { // 
		console.log( 'Attempting to import themes from private/data/themes.json' );
		var themes = JSON.parse( Assets.getText('data/themes.json') );
		_.each( themes, function( theme, i ) {
			console.log( 'Importing theme ' + (i + 1) + '/' + themes.length );
			Themes.insert( theme );
		});
	} catch(e) {
		console.log( 'couldn\'t load private/data/themes.json' );
	}
}