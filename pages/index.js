import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Banner from "../components/banner";

export default function Home() {
  const handleOnBannerBtnClick = () => {
    console.log("Hi from banner");
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>Coffee Aficionado</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Banner
          buttonText="View stores nearby"
          handleOnClick={handleOnBannerBtnClick}
        />
      </main>
      <div className={styles.heroImage}>
        <Image src="/static/background-emblem.png" width={300} height={412} />
      </div>
    </div>
  );
}
