[![Build Status](https://travis-ci.org/zooniverse/vox.svg?branch=master)](https://travis-ci.org/zooniverse/vox)

[![bitHound Overall Score](https://www.bithound.io/github/zooniverse/vox/badges/score.svg)](https://www.bithound.io/github/zooniverse/vox)

# Welcome to VoX

A voting client that stores users votes with Firebase, based on [Zooniverse Reduxify](https://github.com/zooniverse/zoo-reduxify).

## Usage

__Install the dependencies:__

`npm install`

__Test:__

```npm run test```

__Development mode with livereload:__

```npm run start```

__When you are done, create a production-ready version of the JS bundle:__

```npm run build```

## Deployment

Changes to master are deployed to S3 via [Travis-CI](https://travis-ci.org/zooniverse/vox). Node dependencies are cached between builds, so if you're adding a new package, you'll need to [clear the cache in Travis](https://travis-ci.org/zooniverse/vox/caches) first.

## Credits

Based on  [Zoonvierse React Starterify](https://github.com/zooniverse/zoo-react-starterify).

## License

Copyright 2015 Zooniverse

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
