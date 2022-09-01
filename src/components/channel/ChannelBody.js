// Init
import React, { useState, useEffect } from 'react';
import Channel from '../../assets/img/chennel1.png';
import Channel1 from '../../assets/chanelimg1.png';
import axios from 'axios';
import { REACT_APP_youtubeApiKey, REACT_APP_channelId } from '../../../src/config';

import { Store, UpdateStore } from '../../StoreContext';

export default function BlogBody() {
  const [loading, setLoading] = useState(false);
  // init
  const updateStore = UpdateStore();
  const { channelVideos } = Store();
  useEffect(() => {
    scrollToTop();
    getVideos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let getVideos = async () => {
    setLoading(true);
    let res = await axios.get(
      `https://www.googleapis.com/youtube/v3/search?key=${REACT_APP_youtubeApiKey}&channelId=${REACT_APP_channelId}&part=snippet,id&order=date&maxResults=20`,
      { 'Access-Control-Allow-Origin': '*', withCredentials: false }
    );
    if (res) {
      updateStore({ channelVideos: res?.data?.items });
    }
    setLoading(false);
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 1,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <div className='channelBodycontainer'>
        <div className='headingchannel'>
          <div className='channelimgdiv'>
            <img src={Channel1} className='channelimg' alt='blogbody' />
          </div>
          <div className='channeltextonImg'>
            <h1 className='channeltextimgH1'>La Chaîne Orientator</h1>
          </div>
        </div>
        <div class='grid-container'>
          {loading ? (
            <>
              <div style={{ textAlign: 'right' }}>
                <h1>Chargement...</h1>
              </div>
            </>
          ) : (
            <>
              {channelVideos?.map((video) => (
                <>
                  {video?.id?.videoId && (
                    <div class='grid-item'>
                      <iframe
                        src={`https://www.youtube.com/watch?v=${video?.id?.videoId}`.replace('/watch?v=', '/embed/')}
                        title='video'
                        width='100%'
                        height='300px'
                      />
                    </div>
                  )}
                </>
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
}
