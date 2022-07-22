import Image from "next/image";
import React from "react";
import SectionTitle from "./sectiontitle";

function TopArtists(props) {
  //console.log(props.props.artists.items);
  //const items = props.props.artists.items;
  const items = props.artists.items.filter((_, index) => index <= 4);

  return (
    <div>
     <SectionTitle title="My Top Artists" />
      <ul>
        {items.map((item, index) => (
          <li key={item.name}>
            <a
              href={item.external_urls.spotify}
              target="_blank"
              rel="noreferrer"
              className="flex hover:opacity-70 no-underline items-center pt-5 pb-5 pr-5  gap-x-7"
            >
              <p className="w-7 text-lg">#{index + 1}</p>
              <Image
                src={item.images[0].url}
                alt="alt"
                width={100}
                height={100}
                objectFit="contain"
                className="rounded-full"
              />

              <p className="font-bold">{item.name} </p>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TopArtists;
