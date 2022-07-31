import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Component {...pageProps} />
      {/* <footer>
        <h2>Made by Stephen</h2>
      </footer> */}
    </div>
  );
}

export default MyApp;
