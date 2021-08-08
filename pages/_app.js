import 'tailwindcss/tailwind.css';
import '../public/app.css';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <ToastContainer position="top-center" />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
