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

Meteor.publish('alerts', function( query ) {
	if( query ) {
		return Alerts.find(query);
	} else {
		return Alerts.find();
	}
});

Meteor.publish('resources', function() {
	return Resources.find();
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

// Fixture for resources if database empty
if( Resources.find().count() === 0 ) {
	try { // 
		console.log( 'Attempting to import resources from private/data/resources.json' );
		var resources = JSON.parse( Assets.getText('data/resources.json') );
		_.each( resources, function( resource, i ) {
			console.log( 'Importing resource ' + (i + 1) + '/' + resources.length );
			Resources.insert( resource );
		});
	} catch(e) {
		console.log( 'couldn\'t load private/data/resources.json' );
	}
}

if( Alerts.find().count() === 0 ) {
	Alerts.insert({
		paths: ['/'],
		title: 'Home',
		content: '_Inspire Me_ is the home of inspiring stories. Read stories from people like you working on their pathway and find out what has and hasn\'t worked for them. Submit your own stories to inspire others in [Add Story](/add).',
		okButton: 'Okay, got it!'
	});
	Alerts.insert({
		paths: ['/story/:_id'],
		title: 'A story',
		content: 'When you are done reading a story and you find it inspiring, you can say so using the simple form underneath the story. This will save the story in [Inspiring Me](/me) so you can find it easily later.',
		okButton: 'Okay, got it!'
	});
	Alerts.insert({
		paths: ['/add'],
		title: 'Add a story',
		content: 'It\'s time to write your first story! Try to include information that can help other people with their own pathway.\n After you share the story it will be processed and published in the Inspire Me app.\n\n Tip: \\_italic\\_ = _italic_ and \\**bold** = **bold**',
		okButton: 'Okay, got it!'
	});
	Alerts.insert({
		paths: ['/me'],
		title: '"Inspiring Me"',
		content: 'Track what has been inspiring you, find the stories you\'ve been inspired by and get help taking your next steps',
		okButton: 'Okay, got it!'
	});
}
