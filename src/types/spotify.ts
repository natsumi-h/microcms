export type SpotifyProps = {
  tracks: TracksProps;
  artists: ArtistsProps;
  recentTracks: RecentTracksProps;
};

export type TracksProps = {
  items: {
    name: string;
    external_urls: {
      spotify: string;
    };
    album: {
      images: {
        url: string;
      }[];
    };
    artists: {
      name: string;
    }[];
  }[];
};

export type ArtistsProps = {
  items: {
    name: string;
    external_urls: {
      spotify: string;
    };
    images: {
      url: string;
    }[];
  }[];
};

export type RecentTracksProps = {
  items: {
    track: {
      id: string;
      name: string;
      external_urls: {
        spotify: string;
      };
      artists: {
        name: string;
      }[];
      album: {
        images: {
          url: string;
        }[];
      };
    };
  }[];
};
