<template>
  <div class="video-item">
    <div>
      <div v-if="video.snippet.thumbnails &&
          video.snippet.thumbnails.medium &&
          video.snippet.thumbnails.medium.url"
          class="video-image">
        <a :href="getVideoUrl()"
          target="_blank">
          <img :src="video.snippet.thumbnails.medium.url" />
        </a>
      </div>
      <div class="video-content">
        <h3 v-text="video.snippet.title" />
        <a :href="getVideoUrl()"
          target="_blank"
          class="watch-link">Watch</a>
        <div v-text="moment( video.snippet.publishedAt ).format( 'MMM D, YYYY \@ h:mma' )" />
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'VideoItem',
  props: [
    'video'
  ],
  methods: {
    getVideoUrl: function() {
      return `https://www.youtube.com/watch?v=${this.video.snippet.resourceId.videoId}`;
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .video-item {
    & > div {
      display: flex;

      @media screen and ( max-width: 500px ) {
        display: block;
      }
    }

    .video-image {
      width: 30%;
      max-width: 250px;
      flex-shrink: 0;
      flex-grow: 0;

      img {
        width: 100%;
      }

      @media screen and ( max-width: 500px ) {
        width: 100%;
        max-width: 100%;
      }
    }

    .video-content {
      flex-grow: 1;
      text-align: left;
      padding: 0.5em 1em;
    }
  }

</style>
