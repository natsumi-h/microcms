import React, { useState } from "react";

function Sansan(props) {
  const [enteredApiKey, setEnteredApiKey] = useState("");

const  sendApiKeyHandler = (event) => {
    event.preventDefault();

    //ここ埋める
    console.log(enteredApiKey);
    return enteredApiKey;
    
  }


 
  const onChangeApiKey = (event) => {
    setEnteredApiKey(event.target.value);
  };

  return (
    <>
      <form onSubmit={sendApiKeyHandler}>
        <div>
          <label>APIキー</label>
          <input value={enteredApiKey} onChange={onChangeApiKey} />
        </div>
        <button>取得</button>
      </form>

      <div>
        <p>住所：{props.address}</p>
        <p>
          名前：{props.lastName} {props.firstName}
        </p>
        <p>Email：{props.email}</p>
      </div>
    </>
  );
}

//Sansan API呼び出し
export async function getStaticProps() {
  const URL = "https://api.sansan.com/v3.2/persons/";
  const personsId = "AD4DBE12821F9A1491D1580248387CFD";
  const apiKey = "ffa9a7267e0546829f21132bc73aaf69";

  // 外部APIのデータをフェッチ
  const response = await fetch(URL + personsId, {
    method: "GET",
    headers: {
      // "X-Sansan-Api-Key": "ffa9a7267e0546829f21132bc73aaf69",
      "X-Sansan-Api-Key": apiKey,
    },
  });
  const json = await response.json();
  const headBizCard = json.item.headBizCard;

  return {
    props: headBizCard,
  };
}

export default Sansan;
