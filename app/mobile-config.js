// This section sets up some basic app metadata,
// the entire section is optional.
App.info({
	id: 'uk.org.inspire-me',
	name: 'Inspire Me',
	description: 'Inspiring stories for care leavers by care leavers',
	author: 'Learning and Work Institute',
	email: 'kevin.campbellwright@learningandwork.org.uk',
	website: 'http://www.learningandwork.org.uk/',
	version: '1.1.1'
});

App.icons({
	// iOS
	'iphone': '../resources/icons/icon-60x60.png',
	'iphone_2x': '../resources/icons/icon-60x60@2x.png',
	'iphone_3x': '../resources/icons/icon-60x60@3x.png',
	'ipad': '../resources/icons/icon-76x76.png',
	'ipad_2x': '../resources/icons/icon-76x76@2x.png',

	// Android
	'android_ldpi': '../resources/icons/icon-36x36.png',
	'android_mdpi': '../resources/icons/icon-48x48.png',
	'android_hdpi': '../resources/icons/icon-72x72.png',
	'android_xhdpi': '../resources/icons/icon-96x96.png'
});

App.launchScreens({
	// iOS
	// https://github.com/phonegap/phonegap/wiki/App-Splash-Screen-Sizes#dimensions-4
	'iphone': '../resources/splash/splash-320x480.png', //
	'iphone_2x': '../resources/splash/splash-320x480@2x.png',
	'iphone5': '../resources/splash/splash-320x568@2x.png',
	'ipad_portrait': '../resources/splash/splash-768x1024.png',
	'ipad_portrait_2x': '../resources/splash/splash-768x1024@2x.png',
	'ipad_landscape': '../resources/splash/splash-1024x768.png',
	'ipad_landscape_2x': '../resources/splash/splash-1024x768@2x.png',

	// Android
	// helpful resource
	// https://github.com/phonegap/phonegap/wiki/App-Splash-Screen-Sizes#dimensions
	'android_ldpi_portrait': '../resources/splash/splash-200x320.png', //
	'android_ldpi_landscape': '../resources/splash/splash-320x200.png', //
	'android_mdpi_portrait': '../resources/splash/splash-320x480.png', //
	'android_mdpi_landscape': '../resources/splash/splash-480x320.png', //
	'android_hdpi_portrait': '../resources/splash/splash-480x800.png', //
	'android_hdpi_landscape': '../resources/splash/splash-800x480.png', //
	'android_xhdpi_portrait': '../resources/splash/splash-720x1280.png', //
	'android_xhdpi_landscape': '../resources/splash/splash-1280x720.png' //
});

App.setPreference('StatusBarOverlaysWebView', 'false');
App.setPreference('StatusBarBackgroundColor', '#000000');
App.setPreference('deployment-target', '7.0');

// seems OK
App.accessRule('*', {launchExternal: true});

App.accessRule('https://www.youtube.com/embed/*', {launchExternal: false});
App.accessRule('http://inspire-me-live.herokuapp.com/*', {launchExternal: false});
App.accessRule('https://inspire-me-live.herokuapp.com/*', {launchExternal: false});
App.accessRule('http://meteor.local/*');
