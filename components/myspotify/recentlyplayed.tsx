import Image from "next/image";
import SectionTitle from "./sectiontitle";
import React, { FC } from "react";
import { RecentTracksProps } from "../../types/spotify";

type Props = {
  recentTracks: RecentTracksProps;
};

export const RecentlyPlayed: FC<Props> = (props) => {
  const items = props.recentTracks.items.filter((_, index) => index <= 2);
  //console.log(items);

  return (
    <div className="mb-20">
      <SectionTitle title="Recently Played" />
      <ul>
        {items.map((item) => (
          <li key={item.track.id}>
            <a
              href={item.track.external_urls.spotify}
              target="_blank"
              rel="noreferrer"
              className="flex hover:opacity-70 no-underline items-center pt-5 pb-5 pr-5  gap-x-7"
            >
              <Image
                src={item.track.album.images[0].url}
                alt="alt"
                width={60}
                height={60}
                objectFit="contain"
              />

              <div>
                <p className="font-bold">{item.track.name}</p>
                <p>{item.track.artists[0].name} </p>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentlyPlayed;
