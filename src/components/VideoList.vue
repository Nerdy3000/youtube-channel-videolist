<template>
  <div class="video-list">
    <div v-if="youtubeResponse.items && youtubeResponse.items.length">
      <div >
        <video-item
          v-for="video in youtubeResponse.items"
          :key="video.id"
          :title="video.snippet.title"
          :description="video.snippet.description"
          :publishedAt="video.snippet.publishedAt"
          :resourceId="video.snippet.resourceId"
          :thumbnails="video.snippet.thumbnails" />
      </div>
    </div>
    <div class="navigation">
      <button
        type="button"
        v-if="youtubeResponse.navigation.prevPageToken"
        @click="loadVideos( youtubeResponse.navigation.prevPageToken )">
        Prev
      </button>
      <button type="button"
        v-if="youtubeResponse.navigation.nextPageToken"
        @click="loadVideos( youtubeResponse.navigation.nextPageToken )">
        Next
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import VideoItem from './VideoItem.vue';

export default {
  name: 'VideoList',
  components: {
    'VideoItem': VideoItem,
  },
  data() {
    return {
      channelPlaylistId: process.env.VUE_APP_YOUTUBE_PLAYLIST_ID,
      youtubeApiKey: process.env.VUE_APP_YOUTUBE_KEY,
      youtubeResponse: {
        items: [],
        navigation: {
          nextPageToken: null,
          prevPageToken: null,
        },
        pageInfo: {
          resultsPerPage: null,
          totalResults: null
        }
      }
    }
  },
  methods: {
    loadVideos: function( pageToken ) {
      const vm = this;
      let apiUrl = `https://www.googleapis.com/youtube/v3/playlistItems?playlistId=${vm.channelPlaylistId}&key=${vm.youtubeApiKey}&part=snippet&maxResults=20`;

      if ( pageToken && typeof pageToken !== 'undefined' ) {
        apiUrl += `&pageToken=${pageToken}`;
      }
      axios.get( apiUrl )
        .then( response => {
          let data = response.data;
          vm.youtubeResponse.items = data.items;
          vm.youtubeResponse.navigation.nextPageToken = ( data.nextPageToken && typeof data.nextPageToken !== 'undefined' )? data.nextPageToken : null;
          vm.youtubeResponse.navigation.prevPageToken = ( data.prevPageToken && typeof data.prevPageToken !== 'undefined' )? data.prevPageToken : null;

          if ( data.pageInfo ) {
            vm.youtubeResponse.pageInfo.totalResults = data.pageInfo.totalResults;
            vm.youtubeResponse.pageInfo.resultsPerPage = data.pageInfo.resultsPerPage;
          }
        })
    },
  },
  mounted() {
    this.loadVideos();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
