niace-stories-app
=================

The alpha application for NIACE, running on Meteor.

# Dev site

http://inspire-me-dev.herokuapp.com/

# Travis Status
![Travis status](https://travis-ci.org/Heydon/niace-stories-app.svg)

## Setup

- Clone Repo
- Install [meteor](https://www.meteor.com/)
- Run meteor

### Commands ( with testing and such )
```bash
curl https://install.meteor.com/ | sh
npm install
npm run jshint
# java is required for the tests
# sudo apt-get install openjdk-7-jre-headless
npm run test
cd app
meteor
```

### Clean database and re-import fixtured stories
#### ***This will wipe the database of stories and themes***

```bash
# make sure the meteor server is running and in a new terminal
meteor mongo
# once attached to the mongo DB
db.stories.drop();
db.themes.drop();
exit

# stop meteor then cd back into the repo's root
cat app/private/data/themes.json | ./scripts/fillout.js 150 > app/private/data/stories.json

# then restart meteor
cd app
meteor
```

The app should report that it's loading the fixtured stories and themes from the private/data folder
