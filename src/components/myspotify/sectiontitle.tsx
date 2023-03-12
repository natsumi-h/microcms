import React, { FC } from "react";
//import { useContext } from "react";
//import {TitleContext} from "../../pages/myspotify";

export type SpotifySectionTitle = {
  title: string;
};

export const SectionTitle:FC<SpotifySectionTitle> = (props)  =>{
  return (
    <h1 className="text-2xl lg:text-3xl border-b border-inherit border-solid leading-relaxed">
      {props.title}
    </h1>
  );
}

export default SectionTitle;
