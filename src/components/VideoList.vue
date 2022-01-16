<template>
  <div>
    <div>
    <a href="#" @click="gotoChannelEntry" class="link">Channel</a>
    <a href="#" @click="gotoPlaylistSelection" class="link">Playlists</a>
    </div>
    <div v-if="playlist">
      <h2 v-text="playlist.title" />
      <span v-text="playlist.itemCount" />
    </div>
    <div v-if="videos && videos.items && videos.items.length" class="video-list">
      <div v-if="videos.items && videos.items.length">
        <div >
          <video-item
            v-for="video in videos.items"
            :key="video.id"
            :video="video" />
        </div>
      </div>
      <div class="navigation">
        <button
          type="button"
          v-if="videos.navigation.prevPageToken"
          @click="navigatePageToken( videos.navigation.prevPageToken )">
          Prev
        </button>
        <button type="button"
          v-if="videos.navigation.nextPageToken"
          @click="navigatePageToken( videos.navigation.nextPageToken )">
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import VideoItem from './VideoItem.vue';

export default {
  name: 'VideoList',
  components: {
    'VideoItem': VideoItem,
  },
  mounted() {
    if ( !this.channel ) {
      this.channelParamCheck();
    } else if ( !this.playlist ) {
      this.playlistParamCheck();
    } else {
      this.tokenCheck();
    }
  },
  computed: {
    ...mapGetters( 'channel', {
      channel: 'channelInfo',
      playlist: 'getSelectedPlaylist',
      videos: 'getSelectedPlaylistVideos',
    }),
  },
  methods: {
    ...mapActions( 'channel', [
      'getChannelInfo',
      'setPlaylistById',
      'getPlaylistVideos',
    ] ),
    gotoChannelEntry: function() {
      this.$router.push({
        name: 'Channel',
      });
    },
    channelParamCheck: function() {
      // If the channel is not set in the state, attempt to fetch the details from the param
      let vm = this;
      if ( this.$route.params.channelId ) {
        this.getChannelInfo( this.$route.params.channelId ).then( function() {
          vm.playlistParamCheck();
        });
        return;
      }

      this.gotoChannelEntry();
    },
    playlistParamCheck: function() {
      // If the playlist is not set in the state, attempt to fetch the details from the param
      let vm = this;
      if ( this.$route.params.playlistId ) {
        this.setPlaylistById( this.$route.params.playlistId ).finally( function() {
          vm.tokenCheck();
        });
        return;
      }

      this.gotoPlaylistSelection();
    },
    tokenCheck: function() {
      // If a page token is set, navigate to that page token
      if ( this.$route.query.pageToken &&
          typeof this.$route.query.pageToken !== 'undefined' ) {
        this.getPlaylistVideos( this.$route.query.pageToken );
      }
    },
    gotoPlaylistSelection: function() {
      this.$router.push({
        name: 'ChannelPlaylists',
        params: {
          'channelId': this.$route.params.channelId
        }
      });
    },
    navigatePageToken: function( token ) {
      const query = { ...this.$route.query, pageToken: token };
      this.$router.replace({ query });
      this.getPlaylistVideos( token );
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
