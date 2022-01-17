<template>
  <div class="video-item">
    <div>
      <div v-if="video.snippet.thumbnails &&
          video.snippet.thumbnails.medium &&
          video.snippet.thumbnails.medium.url"
          class="video-image">
        <a :href="getVideoUrl()"
          target="_blank">
          <div class="thumbnail-overlay">
            <div class="icon-wrapper">
              <img src="../assets/img/youtube.svg"
                width="40px"
                title="Play on YouTube" />
            </div>
          </div>
          <img :src="video.snippet.thumbnails.medium.url"
            :width="`${video.snippet.thumbnails.medium.width}px`"
            :title="`${video.snippet.title} preview`" />
        </a>
      </div>
      <div class="video-content">
        <h4 class="video-title">
          <a class="watch-link"
            :href="getVideoUrl()"
            target="_blank" v-text="video.snippet.title"/>
        </h4>
        <div class="video-upload-datetime"
          v-text="moment( video.snippet.publishedAt ).format( 'MMM D, YYYY \@ h:mma' )" />
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

<style lang="scss" scoped>
  .video-item {

    & > div {
      display: flex;

      @media screen and ( max-width: $smallMaxSize ) {
        display: block;
      }
    }

    .video-image {
      width: 30%;
      max-width: 150px;
      flex-shrink: 0;
      flex-grow: 0;

      & > a {
        display: inline-block;
        position: relative;
        line-height: 0;
        box-shadow: 5px 3px 10px -3px rgba( $blackColor, 0.55 );

        .thumbnail-overlay {
          display: block;
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba( $blackColor, 0.6 );
          opacity: 0;

          & > .icon-wrapper {
            position: absolute;
            width: 40px;
            height: 40px;
            top: 50%;
            left: 50%;
            transform: translateX(-50%) translateY(-50%);
          }
        }

        &:hover, &:focus {
          .thumbnail-overlay {
            animation: fadeIn 0.4s;
            opacity: 1;

            & > .icon-wrapper {
              & > img {
                animation: scale-up-center 0.4s cubic-bezier( 0.39, 0.575, 0.565, 1 ) both;
              }
            }
          }
        }

        & > img {
          width: 100%;
          max-width: 100%;
        }
      }

      @media screen and ( max-width: $smallMaxSize ) {
        width: 100%;
        max-width: 100%;
      }
    }

    .video-content {
      flex-grow: 1;
      text-align: left;
      padding: 0 1em;

      h4 {
        margin-top: 0;
        margin-bottom: 0.5em;

        a {
          color: inherit;
          text-decoration: none;
        }
      }

      .video-upload-datetime {
        font-size: 0.8em;
      }
    }

    & + .video-item {
      margin-top: 0.5em;
    }
  }


/**
 * ----------------------------------------
 * animation scale-up-center
 * ----------------------------------------
 */
@keyframes scale-up-center {
  0% {
    transform: scale(0.5);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes fadeIn {
  0% {opacity:0;}
  100% {opacity:1;}
}

</style>
