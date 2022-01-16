import Vue from 'vue';
import Router from 'vue-router';
import Channel from '@/components/Channel';
import ChannelPlaylists from '@/components/ChannelPlaylists';
import VideoList from '@/components/VideoList';

Vue.use( Router );

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Channel',
      component: Channel
    },
    {
      path: '/:channelId',
      name: 'ChannelPlaylists',
      component: ChannelPlaylists
    },
    {
      path: '/:channelId/:playlistId',
      name: 'VideoList',
      component: VideoList
    }
  ]
});
