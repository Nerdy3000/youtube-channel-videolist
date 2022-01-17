<template>
  <div class="channel-entry">
    <h1>Enter the Channel ID</h1>
    <div class="channel-input-instructions">
      <h3>How to Use This App</h3>
      <p>The Channel ID can be found by going to the channel on the <a href="https://youtube.com" target="_blank" title="Youtube">YouTube</a> website. You can enter the channel ID specifically, or copy and paste the entire link for the channel.</p>
      <p>After entering the channel and pressing the "Get Playlists" button, you will see a list of all playlists, including a list of <strong>All Uploads</strong> for the channel.</p>
    </div>
    <div class="channel-input-container">
      <div class="channel-url-prompt">
        <span>https://www.youtube.com/channel/</span>
      </div>
      <div class="channel-input">
        <input type="text" v-model="channelId" @change="channelChanged()" />
      </div>
    </div>
    <div class="channel-button">
      <button type="button"
          class="btn"
          @click="channelChanged()">
        Get Playlists
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Channel',
  data() {
    return {
      'channelId': null,
    };
  },
  mounted() {
    this.channelId = process.env.VUE_APP_YOUTUBE_CHANNEL_ID.slice();
  },
  computed: {
    ...mapGetters( 'channel', {
      channel: 'channelInfo',
    }),
  },
  methods: {
    ...mapActions( 'channel', [
      'getChannelInfo',
    ] ),
    channelChanged: function() {
      if ( this.channelId ) {
        var vm = this;
        this.getChannelInfo( this.channelId ).then( function() {
          if ( vm.channel ) {
            vm.$router.push({
              name: 'ChannelPlaylists',
              params: { 'channelId': vm.channelId },
            });
          } else {
            // TODO: Throw error
          }
        });
      }
    }
  }
};

</script>

<style lang="scss" scoped>

$youtube-red: #FF0000;

.channel-entry {
  padding: 1em 1em 2em;

  h3 {
    text-transform: uppercase;
  }

  .channel-input-instructions {
    padding: 1em 0 2em;
  }

  a {
    color: $youtube-red;
    font-weight: bold;
  }
}

.channel-input-container {
  display: flex;
  justify-content: center;
  margin-bottom: 1em;

  @media screen and ( max-width: 500px ) {
    display: block;
  }

  .channel-url-prompt {
    font-size: 16px;
    margin: 0.2em;
  }

  .channel-input {
    margin: 0 0.2em;
    width: 250px;

    @media screen and ( max-width: 500px ) {
      width: 100%;
      margin: 0;
    }

    input[type=text] {
      padding: 0.2em;
      border: 1px solid #ccc;
      font-size: 16px;
      width: 100%;
    }
  }
}

.channel-button {
  margin-top: 0.5em;

  .btn {
    border: none;
    background: $youtube-red;
    color: #fff;
    padding: 0.3em 1em;
    font-size: 1.3em;
    text-transform: uppercase;
    border-radius: 3px;
    cursor: pointer;

    &:hover, &:focus, &:active {
      background: darken( $youtube-red, 10% );
    }
  }
}
</style>
