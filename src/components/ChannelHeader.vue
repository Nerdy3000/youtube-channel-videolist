<template>
  <div class="channel-heading">
    <div v-if="channel">
      <div class="channel-background">
        <div class="channel-background-image"
          v-if="channel.brandingSettings &&
              channel.brandingSettings.image &&
              channel.brandingSettings.image.bannerExternalUrl"
          :style="{ backgroundImage: 'url(' + channel.brandingSettings.image.bannerExternalUrl + ')' }"></div>
      </div>
      <div v-if="channel.snippet"
        class="channel-details">
        <div v-if="channel.snippet.thumbnails &&
            channel.snippet.thumbnails.default"
            class="channel-logo-wrapper">
            <a href="#"
                @click="gotoPlaylistSelection()"
                title="Go to Playlist Selection">
              <div class="channel-logo"
                :style="{ backgroundImage: 'url(' + channel.snippet.thumbnails.default.url + ')' }"></div>
            </a>
        </div>
        <div class="channel-title">
          <h2>
            <a href="#"
                @click="gotoPlaylistSelection()"
                title="Go to Playlist Selection"
                v-text="channel.snippet.title" />
            <small>
              <a href="#"
                @click="gotoChannelEntry"
                title="Select a different channel">
                (change)
              </a>
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
  $text-color: #2c3e50;

.channel-background {
  height: 100px;

  & > .channel-background-image {
    height: 100px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: 100% auto;
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
    box-shadow: 3px 3px 16px -5px rgba(0,0,0,0.6);
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
      color: $text-color;
      text-decoration: none;
    }

    small > a {
      color: #666;
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
