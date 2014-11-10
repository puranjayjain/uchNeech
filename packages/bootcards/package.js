Package.describe({
  // Short two-sentence summary.
  summary: "Bootcards",
  // Version number.
  version: "1.0.0",
  // Optional.  Default is package directory name.
  name: "pranay:bootcards"
});

Package.onUse (function (api)
{
	api.addFiles ('lib/bootcards.js', 'client');
	api.addFiles ('cssoverrides.css', 'client');
	if (Meteor.isClient)
		{
			platform = window.navigator.platform? navigator.platform : null;
			if (platform)
			{
				if (/android/i.test(platform))
				{
					api.addFiles ('lib/bootcards-android-lite.css', 'client'); console.log ("android");
				}
				else if (/iPhone|iPad|iPod/i.test(platform))
				{
					api.addFiles ('lib/bootcards-ios-lite.css', 'client'); console.log ("ios");
				}
				else
				{
					api.addFiles ('lib/bootcards-desktop-lite.css', 'client'); console.log ('desktop');
				}
			}
		}
})
