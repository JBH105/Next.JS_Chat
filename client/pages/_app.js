import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  console.log(<Component/>, pageProps ,"Component, pagePropsComponent, pageProps")
  return <Component {...pageProps} />
}

export default MyApp
