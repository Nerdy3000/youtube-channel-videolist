<template>
  <div class="channel-details">
    <div v-if="channel">
      <channel-header :channel="channel" />
      <div v-if="playlists && playlists.length"
          class="channel-playlists">
        <playlist-item v-for="playlist in playlists" :key="playlist.id" :playlist="playlist" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import ChannelHeader from './ChannelHeader.vue';
import PlaylistItem from './PlaylistItem.vue';

export default {
  name: 'ChannelPlaylists',
  components: {
    'ChannelHeader': ChannelHeader,
    'PlaylistItem': PlaylistItem,
  },
  computed: {
    ...mapGetters( 'channel', {
      channelId: 'channelId',
      channel: 'channelInfo',
      playlists: 'getChannelPlaylists',
    }),
  },
  mounted() {
    if ( !this.channel ) {
      if ( this.$route.params.channelId ) {
        this.getChannelInfo( this.$route.params.channelId );
      } else {
        this.gotoChannelEntry();
        return;
      }
    }
  },
  methods: {
    ...mapActions( 'channel', [
      'getChannelInfo',
    ] ),
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
</style>
