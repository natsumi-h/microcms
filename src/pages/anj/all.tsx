import { useState } from "react";
import styles from "../../styles/Anj.module.css";
import { GetServerSideProps, NextPage } from "next";

type Props = any;

const AnjAll: NextPage<Props> = ({ data }) => {
  // const url = `https://live.cms-artnewsjapan.work/article/list?_sort=publishedDate:DESC,sort:DESC&_limit=-1`;

  // const fetcher = async (url: string) => {
  //   const res = await fetch(url, {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });
  //   const data = await res.json();
  //   return data;
  // };

  // const { data, error, isLoading } = useSWR(url, fetcher);
  console.log(data && data);

  const [limit, setLimit] = useState(6);
  const slicedData = data?.slice(0, limit);
  const buttonClickHandler = () => {
    setLimit((prevLimit) => prevLimit + 6);
  };

  return (
    <>
      <h1 className={styles.h1}>全件ずつコールするケース</h1>
      {/* {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>error</div>
      ) : ( */}
      <div>
        {slicedData?.map((item: any, index: number) => (
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

      {slicedData?.length < data?.length ? (
        <div className={styles.buttonDiv}>
          <button className={styles.button} onClick={buttonClickHandler}>
            View More
          </button>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default AnjAll;

export const getServerSideProps: GetServerSideProps = async () => {
  const getArticles = await fetch(
    "https://live.cms-artnewsjapan.work/article/list?_sort=publishedDate:DESC,sort:DESC&_start=0&_limit=-1"
  );
  const data = await getArticles.json();
  console.log(data);

  return {
    props: { data },
  };
};
