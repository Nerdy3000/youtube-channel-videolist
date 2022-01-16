<template>
  <div class="channel">
    <h1>Channel Url</h1>
    <div class="channel-input-container">
      <div class="channel-url-prompt">
        <span>https://www.youtube.com/channel/</span>
      </div>
      <div class="channel-input">
        <input type="text" v-model="channelId" @change="channelChanged()" />
      </div>
      <div class="channel-button">
        <button type="button" @click="channelChanged()">Get Playlists</button>
      </div>
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
