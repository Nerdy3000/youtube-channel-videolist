<template>
  <div class="video-item">
    <div>
      <div v-if="thumbnails &&
          thumbnails.medium &&
          thumbnails.medium.url"
          class="video-image">
        <a :href="getVideoUrl()"
          target="_blank">
          <img :src="thumbnails.medium.url" />
        </a>
      </div>
      <div class="video-content">
        <h3 v-text="title" />
        <a :href="getVideoUrl()"
          target="_blank"
          class="watch-link">Watch</a>
        <div v-text="publishedAt" />
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'VideoItem',
  props: [
    'title',
    'description',
    'publishedAt',
    'resourceId',
    'thumbnails',
  ],
  methods: {
    getVideoUrl: function() {
      return `https://www.youtube.com/watch?v=${this.resourceId.videoId}`;
    },
  },
  mounted() {
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .video-item {
    & > div {
      display: flex;
    }

    .video-image {
      width: 30%;
      max-width: 250px;
      flex-shrink: 0;
      flex-grow: 0;

      img {
        width: 100%;
      }
    }

    .video-content {
      flex-grow: 1;
      text-align: left;
      padding: 0.5em 1em;
    }
  }

</style>
