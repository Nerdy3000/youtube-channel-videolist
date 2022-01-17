<template>
  <div class="channel-heading">
    <div v-if="channel">
      <div class="channel-background">
        <div class="channel-background-image"
          v-if="channel.brandingSettings &&
              channel.brandingSettings.image &&
              channel.brandingSettings.image.bannerExternalUrl"
          :style="{ backgroundImage: 'url(' + channel.brandingSettings.image.bannerExternalUrl + ')' }"></div>

        <router-link class="btn-close"
            :to="{ name: 'Channel' }"
            title="Select a different channel">
          &times;
        </router-link>
      </div>
      <div v-if="channel.snippet"
        class="channel-details">
        <div v-if="channel.snippet.thumbnails &&
            channel.snippet.thumbnails.default"
            class="channel-logo-wrapper">
          <router-link
                :to="{ name: 'ChannelPlaylists', params: { channelId: channel.id } }"
                title="Go to Playlist Selection">
            <div class="channel-logo"
              :style="{ backgroundImage: 'url(' + channel.snippet.thumbnails.default.url + ')' }"></div>
          </router-link>
        </div>
        <div class="channel-title">
          <h2>
            <router-link
                :to="{ name: 'ChannelPlaylists', params: { channelId: channel.id } }"
                title="Go to Playlist Selection"
                v-text="channel.snippet.title" />
            <small>
              <router-link
                  :to="{ name: 'Channel' }"
                  title="Select a different channel">
                (change)
              </router-link>
            </small>
          </h2>
        </div>
        <div class="channel-youtube-link">
          <a :href="`https://www.youtube.com/channel/${channel.id}`"
              target="_blank"
              title="Go to YouTube Channel">
            <img src="../assets/img/youtube.svg" />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'ChannelHeader',
  props: [
    'channel'
  ],
  methods: {
    gotoPlaylistSelection: function() {
      this.$router.push({
        name: 'ChannelPlaylists',
        params: {
          'channelId': this.$route.params.channelId,
        }
      });
    },
    gotoChannelEntry: function() {
      vm.$router.push({
        name: 'Channel',
      });
    },
  }
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

.channel-background {
  position: relative;
  height: 100px;

  & > .channel-background-image {
    height: 100px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: 100% auto;
  }

  & > a.btn-close {
    position: absolute;
    z-index: 2;
    top: 0;
    right: 0;
    text-decoration: none;
    color: $whiteColor;
    font-size: 2em;
    line-height: 1em;
    padding: 0 0.3em;
    text-shadow: 0px 0px 5px $blackColor;
  }
}

.channel-details {
  display: flex;
  margin: 0 1em;

  .channel-logo {
    width: 88px;
    height: 88px;
    border-radius: 50%;
    transform: translateY( -30% );
    box-shadow: 3px 3px 16px -5px rgba( $blackColor, 0.6 );
    margin-right: 1em;
  }

  .channel-youtube-link, .channel-logo {
    flex-grow: 0;
    flex-shrink: 0;
  }

  .channel-title {
    flex-grow: 1;
    flex-shrink: 1;
    text-align: left;

    a {
      color: $textColor;
      text-decoration: none;
    }

    small > a {
      color: lighten( $blackColor, 40% );
      font-size: 0.6em;
      font-weight: normal;
    }
  }

  .channel-youtube-link {
    align-self: flex-start;
    margin: 0.5em 1em;
  }
}

</style>
