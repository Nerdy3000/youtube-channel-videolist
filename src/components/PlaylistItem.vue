<template>
  <div class="playlist">

    <div v-if="playlist.thumbnails.medium" class="playlist-thumbnail">
      <img :src="playlist.thumbnails.medium.url" :alt="`${ playlist.title } Videos`" />
    </div>
    <h4 class="title" v-text="playlist.title" />
    <div class="video-count" v-text="playlist.itemCount" />
    <button @click="viewVideos()">View Videos</button>
  </div>
</template>

<script>

export default {
  name: 'PlaylistItem',
  props: [
    'playlist'
  ],
  data() {
    return {};
  },
  mounted: function() {
  },
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
</style>
