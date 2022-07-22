import { getAccessToken } from "../lib/spotify";
import TopTracks from "../components/myspotify/toptracks";
import TopArtists from "../components/myspotify/topartists";
import RecentlyPlayed from "../components/myspotify/recentlyplayed";
import React from "react";
//import { createContext, useContext } from "react";

//export const TitleContext = createContext("title");

function MySpotify(props) {
  return (
    <>
      <TopTracks tracks={props.tracks} />
      <TopArtists artists={props.artists} />
      <RecentlyPlayed recentTracks={props.recentTracks} />
    </>
  );
}

export const getStaticProps = async () => {
  const { access_token } = await getAccessToken();
  //トップトラックスの取得
  const getTopTracks = await fetch("https://api.spotify.com/v1/me/top/tracks", {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  const tracks = await getTopTracks.json();
  //console.log(tracks.items);

  //トップアーティスツの取得
  const getTopArtists = await fetch(
    "https://api.spotify.com/v1/me/top/artists",
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );
  const artists = await getTopArtists.json();
  //console.log(artists);

  //Currently Playingの取得
  const getCurrentTrack = await fetch(
    "https://api.spotify.com/v1/me/player/recently-played",
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );
  const recentTracks = await getCurrentTrack.json();
  console.log(recentTracks);

  return {
    props: {
      tracks: tracks,
      artists: artists,
      recentTracks: recentTracks,
    },
    revalidate:1,
  };
};

export default MySpotify;
