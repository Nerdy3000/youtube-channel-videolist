import axios from "axios";

const state = () => ({
  youtubeApiKey: process.env.VUE_APP_YOUTUBE_KEY,
  channelId: process.env.VUE_APP_YOUTUBE_CHANNEL_ID.slice(),
  channel: null,
  playlists: [],
  selectedPlaylist: null,
  playlistVideos: null,
});

// getters
const getters = {
  channelId: ( state ) => {
    return state.channelId;
  },
  channelInfo: ( state ) => {
    return state.channel;
  },
  cleanChannelId: () => ( channelIdStr ) => {
    const youTubeUrl = 'https://www.youtube.com/channel/';
    if ( channelIdStr.startsWith( youTubeUrl ) ) {
      channelIdStr = channelIdStr.replace(/^https:\/\/www.youtube.com\/channel\//i, '' );
    }
    return channelIdStr;
  },
  getChannelPlaylists: ( state, getters ) => {
    let channelPlaylists = [];

    let allUploads = getters.uploadsPlaylist();
    if ( allUploads ) {
      channelPlaylists.push( allUploads );
    }

    state.playlists.forEach( function( playlistObj ) {
      channelPlaylists.push( getters.formatPlaylist( playlistObj ) );
    });
    return channelPlaylists;
  },
  getPlaylistbyId: ( state, getters ) => ( playlistId ) => {
    return getters.getChannelPlaylists.find( element => element.id === playlistId );
  },
  getSelectedPlaylist: ( state ) => {
    return state.selectedPlaylist;
  },
  getSelectedPlaylistVideos: ( state ) => {
    return state.playlistVideos;
  },
  formatPlaylist: () => ( playlist ) => {
    return {
      "id": playlist.id,
      "publishedAt": playlist.snippet.publishedAt,
      "title": playlist.snippet.title,
      "description": playlist.snippet.title,
      "thumbnails": playlist.snippet.thumbnails,
      "itemCount": playlist.contentDetails.itemCount,
    };
  },
  uploadsPlaylist: ( state ) => () => {
    if ( state.channel && state.channel.uploadsPlaylistId ) {
      return {
        "id": state.channel.uploadsPlaylistId,
        "publishedAt": null,
        "title": state.channel.snippet.title + ' Uploads',
        "description": 'All uploads from ' + state.channel.snippet.title,
        "thumbnails": state.channel.snippet.thumbnails,
        "itemCount": state.channel.statistics.videoCount,
      };
    }
    return null;
  }
};

// actions
const actions = {
  getChannelInfo ( { commit, dispatch, getters, state }, channelId ) {
    let cleanChannelStr = getters.cleanChannelId( channelId );
    let apiUrl = `https://www.googleapis.com/youtube/v3/channels?id=${cleanChannelStr}&key=${state.youtubeApiKey}&part=brandingSettings,statistics,snippet,contentDetails`;

    return axios.get( apiUrl )
      .then( response => {
        let data = response.data;
        if ( data.items &&
            typeof data.items !== 'undefined' &&
            data.items.length > 0 ) {

          dispatch( 'getChannelPlaylists' );
          commit( 'setChannelId', cleanChannelStr );
          commit( 'setChannel', data.items[0] );
        } else {
          // TODO: throw error
        }
      });
  },

  getChannelPlaylists ( { commit, state } ) {

    let apiUrl = `https://www.googleapis.com/youtube/v3/playlists?channelId=${state.channelId}&key=${state.youtubeApiKey}&part=contentDetails,snippet&maxResults=50`;

    return axios.get( apiUrl )
      .then( response => {
        let data = response.data;
        if ( data.items && typeof data.items !== 'undefined' ) {
          commit( 'setPlaylists', data.items );
        } else {
          commit( 'setPlaylists', [] );
        }
      });
  },

  getPlaylistVideos ( { commit, state }, pageToken ) {

    const resultsPerPage = 50;
    let apiUrl = `https://www.googleapis.com/youtube/v3/playlistItems?playlistId=${state.selectedPlaylist.id}&key=${state.youtubeApiKey}&part=snippet,status&maxResults=${resultsPerPage}`;

    if ( pageToken && typeof pageToken !== 'undefined' ) {
      apiUrl += `&pageToken=${pageToken}`;
    }

    return axios.get( apiUrl )
      .then( response => {
        let data = response.data;
        commit( 'setPlaylistVideos', data );
      });
  },

  setPlaylistById( { commit, dispatch, state, getters }, playlistId ) {

    let playlist = getters.getPlaylistbyId( playlistId );
    commit( 'setSelectedPlaylist', playlist );

    if ( playlist ) {
      dispatch( 'getPlaylistVideos' );
    } else if ( state.playlists.length === 0 ) {
      // Playlists are not loaded. Wait for them to load and try again.
      dispatch( 'getChannelPlaylists' ).then( () => {
        if ( state.playlists.length > 0 ) {
          dispatch( 'setPlaylistById', playlistId );
        }
      });
    }
  }
};

// mutations
const mutations = {
  setChannelId ( state, channelId ) {
    state.channelId = channelId;
  },
  setChannel ( state, channel ) {
    let uploadsPlaylistId = null;
    if ( channel.contentDetails &&
        channel.contentDetails.relatedPlaylists &&
        channel.contentDetails.relatedPlaylists.uploads ) {
      uploadsPlaylistId = channel.contentDetails.relatedPlaylists.uploads;
    }

    state.channel = {
      brandingSettings: channel.brandingSettings,
      snippet: channel.snippet,
      statistics: channel.statistics,
      uploadsPlaylistId: uploadsPlaylistId,
    };
  },
  setPlaylists ( state, playlists ) {
    state.playlists = playlists;
  },
  setSelectedPlaylist ( state, playlist ) {
    state.selectedPlaylist = playlist;
  },
  setPlaylistVideos ( state, videoResponse ) {
    state.playlistVideos = {
      items: ( videoResponse.items.filter( item => item.status.privacyStatus === 'public' ) ),
      pageInfo: videoResponse.pageInfo,
      navigation: {
        prevPageToken: ( typeof videoResponse.prevPageToken !== 'undefined')? videoResponse.prevPageToken : null,
        nextPageToken: ( typeof videoResponse.nextPageToken !== 'undefined')? videoResponse.nextPageToken : null,
      }
    };
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
