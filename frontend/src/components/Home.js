
import { Fragment } from "react/jsx-runtime";
import MetaData from "./layouts/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProducts } from "../actions/productsActions";
import Loader from "./layouts/Loader";
import Product from "./product/Product";
import { toast } from "react-toastify";


export default function Home() {

    const dispatch = useDispatch();
    const { products,loading,error } = useSelector((state) => state.productsState);


   useEffect(() => {

    if (error) {
        return toast.error(error)
    }
        dispatch(getProducts());
    }, [error,dispatch]);



  return (
    <Fragment>

    {loading ? <Loader /> : 

        <Fragment>

                
            <h1 id="products_heading">Latest Products</h1>

            <MetaData title={'Products'} />

                <section id="products" className="container mt-5">
                    <div className="row">
                        {products && products.map((product) => (
                        <Product product={product}/>
                    ))}
                    </div>
                </section>

        </Fragment>
    }
    </Fragment>
  );
}
