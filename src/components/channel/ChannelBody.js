// Init
import React, { useState, useEffect } from "react";
import Channel from "../../assets/img/chennel1.png";
import axios from "axios";

import { Store, UpdateStore } from "../../StoreContext";

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
      `https://www.googleapis.com/youtube/v3/search?key=${process.env.REACT_APP_youtubeApiKey}&channelId=${process.env.REACT_APP_channelId}&part=snippet,id&order=date&maxResults=20`,
      { "Access-Control-Allow-Origin": "*", withCredentials: false }
    );
    if (res) {
      updateStore({ channelVideos: res?.data?.items });
    }
    setLoading(false);
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 1,
      behavior: "smooth"
    });
  };
  console.log("channelVideos", channelVideos);

  return (
    <>
      <div className="BlogBodycontainer">
        <img
          src={Channel}
          className="BlogbodyImage channelimg"
          alt="blogbody"
        />
        <div className="channeltextonImg">
          <h1 className="channeltextimgH1">NOTRE CHAÎNE YOUTUBE</h1>
        </div>
        <div class="grid-container">
          {loading ? (
            <>
              <div></div>
              <div>
                <h1>Chargement...</h1>
              </div>
            </>
          ) : (
            <>
              {channelVideos?.map((video) => (
                <>
                  {video?.id?.videoId && (
                    <div class="grid-item">
                      <iframe
                        src={`https://www.youtube.com/watch?v=${video?.id?.videoId}`.replace(
                          "/watch?v=",
                          "/embed/"
                        )}
                        title="video"
                        width="100%"
                        height="300px"
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
