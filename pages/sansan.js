import React from "react";
import { useState } from "react";

//if (typeof window !== "undefined") {
//  document
//    .getElementById("submitButton")
//    .addEventListener("click", () => onClickSubmit());
//}

function HomePage(props) {
  //console.log(props);
  const [apiKey, setApiKey] = useState("");

  const onChangeApiKey = (event) => {
    setApiKey(event.target.value);
  };

  const onClickSubmit = () => {
    //const inputApiKey = document.getElementById("addApiKey").value;
    //document.getElementById("addApiKey").value = "";
    //console.log(inputApiKey);
    //return inputApiKey;
    console.log(apiKey);
  };

  return (
    <div>
      <h1>index</h1>

      <form>
        <input
          id="addApiKey"
          placeholder="API Key"
          onChange={onChangeApiKey}
          valur={apiKey}
        ></input>
        <input placeholder="人物ID"></input>
        <button id="submitButton" onClick={onClickSubmit}>
          人物情報を取得
        </button>
      </form>

      <ul>
        <li>
          名前：{props.json.item.headBizCard.lastName}
          {props.json.item.headBizCard.firstName}
        </li>
        <li>メールアドレス：{props.json.item.headBizCard.email}</li>
        <li>会社名：{props.json.item.headBizCard.companyName}</li>
        <li>API key : {apiKey}</li>
      </ul>
    </div>
  );
}

//Sansan API呼び出し
export async function getStaticProps() {
  // 外部APIのデータをフェッチ
  const response = await fetch(
    "https://api.sansan.com/v3.2/persons/AD4DBE12821F9A1491D1580248387CFD",
    {
      method: "GET",
      headers: {
        "X-Sansan-Api-Key": "ffa9a7267e0546829f21132bc73aaf69",
      },
    }
  );
  const json = await response.json();
  //console.log(json.item.headBizCard.city);

  return {
    props: {
      json,
    },
  };
}

export default HomePage;
