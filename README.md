# youtube-channel-videolist

> A Vue.js project that I built to play around with YouTube playlists.

The motivation for this project was because I wanted to watch all the videos by a specific creator on YouTube, but they have content going back 12 years and the YouTube application limits how many videos display, allowing sorting for newest or most popular, but still limited on how many videos would show.

I wanted a tool that would allow me to see all the videos uploaded from the channel and be able to paginate through the uploads.

Here is a link to the [YouTube API v3](https://developers.google.com/youtube/v3) that is referenced. An API key can be created in the [Google APIs and Services Console](https://console.cloud.google.com/apis/dashboard).

## Build Setup

Copy the `.env.example` file and name it `.env`. Fill in all appropriate variables.

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
