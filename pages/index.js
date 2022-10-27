import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Banner from "../components/banner";
import Card from "../components/card";
import { fetchCoffeeStores } from "../lib/coffee-stores";
import useTrackLocation from "../hooks/use-track-location";
import { useEffect, useState, useContext } from "react";
import { ACTION_TYPES, StoreContext } from "../store/store-context";

export async function getStaticProps(context) {
  const coffeeStores = await fetchCoffeeStores();

  return {
    props: {
      coffeeStores,
    },
  };
}

export default function Home(props) {
  const { handleTrackLocation, locationErrorMsg, isFindingLocation } =
    useTrackLocation();

  //const [coffeeStores, setCoffeeStores] = useState("");
  const [coffeeStoresError, setCoffeeStoresError] = useState(null);

  const { dispatch, state } = useContext(StoreContext);

  const { coffeeStores, latLong } = state;

  useEffect(() => {
    const fetchData = async () => {
      if (latLong) {
        try {
          const response = await fetch(
            `/api/getCoffeeStoresByLocation?latLong=${latLong}&limit=30`
          );

          const coffeeStores = await response.json();
          //setCoffeeStores(fetchedCoffeeStores);
          dispatch({
            type: ACTION_TYPES.SET_COFFEE_STORES,
            payload: {
              coffeeStores: coffeeStores,
            },
          });
          setCoffeeStoresError("");
          //set coffee stores
        } catch (error) {
          //set error
          console.log({ error });
          setCoffeeStoresError(error.message);
        }
      }
    };
    fetchData();
  }, [latLong]);
  const handleOnBannerBtnClick = () => {
    handleTrackLocation();
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Coffee Aficionado</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Banner
          buttonText={isFindingLocation ? "Locating..." : "View stores nearby"}
          handleOnClick={handleOnBannerBtnClick}
        />
        {locationErrorMsg && <p>Something went wrong: {locationErrorMsg}</p>}
        {coffeeStoresError && <p>Something went wrong: {coffeeStoresError}</p>}
        <div className={styles.heroImage}>
          <Image src="/static/background-emblem.png" width={700} height={400} />
        </div>

        {coffeeStores.length > 0 && (
          <div className={styles.sectionWrapper}>
            <h2 className={styles.heading2}>Coffee Stores Near Me</h2>
            <div className={styles.cardLayout}>
              {coffeeStores.map((coffeeStore) => {
                return (
                  <Card
                    name={coffeeStore.name}
                    imgUrl={
                      coffeeStore.imgUrl ||
                      "https://images.unsplash.com/photo-1498804103079-a6351b050096?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2468&q=80"
                    }
                    href={`/coffee-store/${coffeeStore.id}`}
                    key={coffeeStore.id}
                  />
                );
              })}
            </div>
          </div>
        )}

        {props.coffeeStores.length > 0 && (
          <div className={styles.sectionWrapper}>
            <h2 className={styles.heading2}>Toronto Coffee Stores</h2>
            <div className={styles.cardLayout}>
              {props.coffeeStores.map((coffeeStore) => {
                return (
                  <Card
                    name={coffeeStore.name}
                    imgUrl={
                      coffeeStore.imgUrl ||
                      "https://images.unsplash.com/photo-1498804103079-a6351b050096?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2468&q=80"
                    }
                    href={`/coffee-store/${coffeeStore.id}`}
                    key={coffeeStore.id}
                  />
                );
              })}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
