
import { Helmet } from "react-helmet-async";


export default function MetaData({title}) {
  return (
    <Helmet>
      <title>{`${title} - MERN 25`}</title>
      <meta name="description" content="MERN 25 - Your one-stop shop for the latest products." />
      <meta name="keywords" content="MERN, e-commerce, online shopping, latest products" />
      <meta name="author" content="MERN 25 Team" />
    </Helmet>
  );
}