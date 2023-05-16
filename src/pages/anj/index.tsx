import React, { useEffect, useState } from "react";
import useSWR from "swr";
import styles from "../../styles/Anj.module.css";
import { GetServerSideProps, NextPage } from "next";

const Anj:NextPage<any> = ({ initialData }) => {
  const [startFrom, setStartFrom] = useState(6);
  const [concatData, setConcatData] = useState(initialData);

  const url = `https://live.cms-artnewsjapan.work/article/list?_sort=publishedDate:DESC,sort:DESC&_start=${startFrom}&_limit=6`;
  console.log(url);

  const fetcher = async (url: string) => {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    return data;
  };

  const { data, error, isLoading } = useSWR(url, fetcher);

  console.log(data && data);

  // データの更新処理
  // const updateData = (data: any) => {
  //   setConcatData((prevData) => prevData.concat(data));
  // };

  const buttonClickHandler = () => {
    setConcatData((prevData:any) => prevData.concat(data));
    setStartFrom((prevStartFrom) => prevStartFrom + 6);
  };

  // useEffect(() => {
  //   if (data) {
  //     updateData(data);
  //   }
  // }, [data]);

  return (
    <>
      <h1 className={styles.h1}>6件ずつコールするケース</h1>
      {/* {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>error</div>
      ) : ( */}
      <div>
        {concatData?.map((item: any, index:number) => (
          <article key={item.id} className={styles.article}>
            <h2 className={styles.h2}>{`${index + 1}. ${item.title}`}</h2>
            <p className={styles.category}>
              {`${item.category?.categoryName} / ${item.subCategory?.name}`}
            </p>
            <time>{item.publishedDate}</time>
          </article>
        ))}
      </div>
      {/* )} */}

      <div className={styles.buttonDiv}>
        {concatData.length < 24 ? (
          <button className={styles.button} onClick={buttonClickHandler}>
            View More
          </button>
        ) : (
          <a
            className={styles.button}
            href="https://google.com"
            target="_blank"
            rel="noreferrer"
          >
            25件目以降はArticles一覧ページへ
          </a>
        )}
      </div>
    </>
  );
};

export default Anj;

export const getServerSideProps: GetServerSideProps = async () => {
  const getArticles = await fetch(
    "https://live.cms-artnewsjapan.work/article/list?_sort=publishedDate:DESC,sort:DESC&_start=0&_limit=6"
  );
  const initialData = await getArticles.json();
  console.log(initialData);

  return {
    props: { initialData },
  };
};
