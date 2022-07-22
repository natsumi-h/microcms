import Image from "next/image";
import React, { Fragment, } from "react";
import SectionTitle from "./sectiontitle";



function TopTracks(props) {
  const items = props.tracks.items.filter((_, index) => index <= 9);

  //console.log(props.tracks.items[2].artists[1].name);
  //console.log(props.tracks.items[2].artists[0].name);
  //console.log(items);

  //const artistsArr = items.map((item) => {
  //  return item.artists;
  //});
  //console.log(items);

  //const thatThatArtists = artistsArr[2].map((item) => {
  //  return item.name;
  //});
  //console.log(thatThatArtists.join(", "));

  //const eachArtist = artistsArr[2].forEach((element) => {
  // console.log(element.name);
  //});

  //onst mapItem = items.map((item) => {
  // if (item.artists.lengths !== 1) {
  //   const test = item.artists.map((artist) => {
  //     return artist.name;
  //   });
  //   const string = test.join(", ");
  //   //console.log(string);
  //   return string;
  // } else {
  //   return;
  // }
  //return item;
  //});
  //console.log(mapItem);
  //console.log(mapItem[2]);

  // const test = map.artists.map((artist) => {
  //   return artist.name;
  // });
  // console.log(test.join(", "));

  //const artistsLength = thatThatArtists.length;
  //const artistsLength = artistsArr[2].length;
  //console.log(artistsLength);

  //const eachLength = map.forEach((element) => {
  //  console.log(element.artists.length);
  //});

  //配列をオブジェクトに変換
  //const obj = artistsArr.reduce((result, current, index) => {
  //  result[index] = current;
  //  return result;
  //});
  //
  //console.log(obj);

  return (
    <div className="mb-20">
      <SectionTitle  title="My Top Streams Songs"/>
      <ul>
        {items.map((item, index) => (
          <li key={item.name}>
            <a
              href={item.external_urls.spotify}
              target="_blank"
              rel="noreferrer"
              className="flex hover:opacity-70 no-underline items-center pt-5 pb-5 pr-5  gap-x-5"
            >
              <p className="w-7 text-lg">#{index + 1}</p>
              <div>
                <Image
                  src={item.album.images[0].url}
                  alt="alt"
                  layout="fixed"
                  width={60}
                  height={60}
                  objectFit="contain"
                />
              </div>

              <div>
                <p className="font-bold">{item.name} </p>
                <div>
                  {item.artists.length === 1
                    ? item.artists[0].name
                    : item.artists.map((artist) => {
                        return (
                          <Fragment key={artist.name}>
                            <p className="inline ">{artist.name}</p>
                            <span className="last:hidden">, </span>
                          </Fragment>
                        );
                      })}
                </div>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TopTracks;
