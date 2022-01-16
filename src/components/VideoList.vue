<template>
  <div>
    <channel-header v-if="channel" :channel="channel" />
    <div v-if="playlist"
        class="inner-content">
      <h2 class="playlist-title">
        <span v-text="playlist.title" />
        <small class="playlist-videocount">{{playlist.itemCount}} videos</small>
      </h2>
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
          <button type="button"
            class="btn btn-prev"
            v-if="videos.navigation.prevPageToken"
            @click="navigatePageToken( videos.navigation.prevPageToken )">
            Prev
          </button>
          <button type="button"
            class="btn btn-next"
            v-if="videos.navigation.nextPageToken"
            @click="navigatePageToken( videos.navigation.nextPageToken )">
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import ChannelHeader from './ChannelHeader.vue';
import VideoItem from './VideoItem.vue';

export default {
  name: 'VideoList',
  components: {
    'ChannelHeader': ChannelHeader,
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

<style lang="scss" scoped>

.playlist-title {
  font-size: 1.8em;

  .playlist-videocount {
    color: #666;
    font-size: normal;
  }
}


.navigation {
  margin-top: 2em;

  .btn {
    background: none;
    box-shadow: none;
    outline: none;
    border: none;
    text-transform: uppercase;
    font-size: 1.2em;
    cursor: pointer;
    position: relative;

    &::after {
      content: "";
      position: absolute;
      top: 0;
      height: 100%;
      width: 1em;
      background-repeat: no-repeat;
      background-size: contain;
      background-position: center;
      background-image: url('../assets/img/chevron.png');
    }

    &.btn-prev {
      padding-left: 1.3em;

      &::after {
        left: 0;
      }

      & + .btn-next {
        margin-left: 1em;
      }
    }

    &.btn-next {
      padding-right: 1.3em;

      &::after {
        right: 0;
        transform: rotate(180deg);
      }
    }
  }
}
</style>
