function getWatcherContacts() {
	var watchers = Config.findOne('watchers');
	var contacts = watchers && watchers.value || [];
	return contacts;
}

Template.watchers.events({
	'submit form': function(e) {
		e.preventDefault();
		var $form = $(e.currentTarget);
		var $input = $form.find('[name="email"]');
		var email = $input.val().trim();

		var watchers = Config.findOne('watchers');
		var contacts = getWatcherContacts();

		if (email) {
			contacts.push(email);
			if (watchers) {
				Config.update('watchers', {
					$set: {
						value: _.unique(contacts)
					}
				});
			} else {
				Config.insert({
					_id: 'watchers',
					value: contacts
				});
			}
			$input.val('');
		}
	},

	'click .remove-watcher': function(e) {
		var $but = $(e.currentTarget);
		var email = $but.find('textarea').val();

		var contacts = getWatcherContacts();

		Config.update('watchers', {
			$set: {
				value: _.without(contacts, email)
			}
		});
	}
});

Template.watchers.helpers({
	watchers: function() {
		return getWatcherContacts();
	}
});