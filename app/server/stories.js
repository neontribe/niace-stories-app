var emailTemplate = Assets.getText('email-template.html');
var curlyRegex = /{([^}]+)}/g;
function filloutTemplate(template, obj) {
	return template.replace(curlyRegex, function(wholeMatch, content) {
		var replacementKey = content && content.trim();

		return obj[replacementKey] || '';
	});
}
function getWatcherContacts() {
	var watchers = Config.findOne('watchers');
	var contacts = watchers && watchers.value || [];
	return contacts;
}

Meteor.methods({
	share: function( story ) {

		var output = {};

		var errors = [];

		if( !story.name ) {
			story.name = 'Anonymous';
		}

		if( !story.story ) {
			errors.push('Please write a story');
		}

		if ( story.story && story.story.length < 300 ) {
			errors.push('Your story is very short. Please try to write more!');
		}

		if( !errors.length ) {
			var newStory = _.extend(_.pick(story, 'name', 'story'), {
				published: false,
				submitted: new Date().getTime()
			});

			var storyId = Stories.insert(newStory);
			output.id = storyId;

			var peopleWhoCare = getWatcherContacts();
			if (peopleWhoCare.length) {
				// Email.error throws. Just swallow the message
				// TODO implement some sort of logging
				try {
					Email.send({
						from: 'no-reply@inspire-me.org.uk',
						to: peopleWhoCare,
						subject: 'A new story has been added',
						html: filloutTemplate(emailTemplate, {
							siteURL: (process.env.ROOT_URL || '').trim().replace(/\/$/, ''),
							id: storyId
						})
					});
				} catch(e) {
					console.log('failed to send mail', e);
				}
			}
		} else {
			// throw an error to populate the error variable on the method callback
			// throw a 400 error so that the server-client communication meets http response code standards
			// http://en.wikipedia.org/wiki/List_of_HTTP_status_codes#400
			throw new Meteor.Error( 400, errors );
		}

		return output;
	},

	modifyStory: function( id, story ) {
		var output = {};
		var errors = [];

		if( !Meteor.user() ) {
			throw new Meteor.Error( 409, ['Access denied']);
		}

		// normalize the input
		id = id && id._id || story && story._id;

		if( !id || !story ) {
			errors.push('Please supply both an ID and a story with data');
		}

		if( story._id ) {
			story = _.without( story, '_id' );
		}

		if( !story.name ) {
			errors.push('Please choose a name');
		}

		if( !story.story ) {
			errors.push('Please write a story');
		}

		if( !story.themes || !story.themes.length ) {
			errors.push('Please select a theme');
		}

		if( !errors.length ) {
			Stories.update( id, {$set: story});
			return output;
		} else {
			// throw an error to populate the error variable on the method callback
			// throw a 400 error so that the server-client communication meets http response code standards
			// http://en.wikipedia.org/wiki/List_of_HTTP_status_codes#400
			throw new Meteor.Error( 400, errors );
		}
	},

	modifyStoryKeywords: function( idAndKeywords ) {
		Stories.update( idAndKeywords._id, _.pick( idAndKeywords, 'keywords' ) );
	}
});