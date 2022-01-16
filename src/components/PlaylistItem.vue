<template>
  <div
    class="playlist">
    <router-link
        :to="{
          name: 'VideoList',
          params: {
            'channelId': $route.params.channelId,
            'playlistId': playlist.id
          }
        }">
      <div class="playlist-thumbnail">
        <div class="playlist-thumbnail-image"
            v-if="playlist.thumbnails.medium"
            :style="{ backgroundImage: 'url(' + playlist.thumbnails.medium.url + ')' }"></div>
        <div class="playlist-video-count-overlay">
          <div class="video-count">
            <span v-text="playlist.itemCount" />
            <small>videos</small>
          </div>
        </div>
      </div>
      <div class="playlist-details">
        <h4 class="title" v-text="playlist.title" />
        <div class="view-full-playlist">
          View full playlist
        </div>
      </div>

    </router-link>
  </div>
</template>

<script>

export default {
  name: 'PlaylistItem',
  props: [
    'playlist'
  ],
  methods: {
    'viewVideos': function() {
      this.$router.push({
        name: 'VideoList',
        params: {
          'channelId': this.$route.params.channelId,
          'playlistId': this.playlist.id,
        },
      });
    },
  }
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

  .playlist {
    margin-bottom: 1em;

    & > a {
      color: inherit;
      text-decoration: none;
    }
  }

  .playlist-thumbnail {
    position: relative;
    width: 100%;
    height: 150px;
    box-shadow: 5px 3px 10px -3px rgba( #000, 0.55 );

    .playlist-thumbnail-image {
      width: 100%;
      height: 100%;
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;
      background-color: #000;
    }

    .playlist-video-count-overlay {
      position: absolute;
      top: 0;
      left: 60%;
      right: 0;
      bottom: 0;
      z-index: 2;
      background: rgba( #000, 0.6 );

      .video-count {
        position: absolute;
        top: 50%;
        width: 100%;
        transform: translateY( -50% );
        text-align: center;
        color: #fff;

        & > span {
          display: block;
          font-weight: bold;
          font-size: 1.2em;
          line-height: 1em;
        }
      }
    }
  }

  .playlist-details {
    text-align: left;
    padding: 0.5em 0.2em;

    h4 {
      margin: 0.1em 0;
    }

    .view-full-playlist {
      text-transform: uppercase;
      font-weight: bold;
      font-size: 0.8em;
      color: #666;
    }
  }
</style>
