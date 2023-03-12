import React from "react";
// import Image from "next/image";

function Aboutme() {
  return (
    <section className="md:flex gap-x-8 items-center">
      <div className="w-1/3 mx-auto">
        {/* <Image
          src="/images/natsumi.jpeg"
          alt="natsumi"
          width={200}
          height={200}
          className={styles.img}
        /> */}
        <img
          src="/images/natsumi.jpeg"
          alt="natsumi"
          // width={200}
          // height={200}
          className="rounded-full w-full "
        />
      </div>
      <div className="mt-4 md:mt-0">
        <p className="text-xl">Natsumi.H</p>
        <p className="mt-4">
          Traveller, Netflix Chiller, Wife, Yoggie, BTS Army, Web dev PM in
          Singapore. <br></br>
          モダンフロント技術を学習中。<br></br>
          #Next.js #Typescript
        </p>
      </div>
    </section>
  );
}

export default Aboutme;
