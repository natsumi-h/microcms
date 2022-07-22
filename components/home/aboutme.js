import React from "react";
import styles from "./aboutme.module.css";
import Image from "next/image";

function Aboutme() {
  return (
    <section className={styles.section}>
      <div>
        <Image
          src="/images/natsumi.jpeg"
          alt="natsumi"
          width={200}
          height={200}
          className={styles.img}
        />
      </div>
      <div>
        <p className={styles.name}>Natsumi.H</p>
        <p className={styles.p}>
          Traveller, Netflix Chiller, Wife, Yoggie, BTS Army, Web director in
          Singapore. <br></br>
          プログラミング学習のモチベ維持のために、ブログを作ってみました。
        </p>
      </div>
    </section>
  );
}

export default Aboutme;
