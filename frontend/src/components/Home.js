
// import { Fragment } from "react/jsx-runtime";
// import MetaData from "./layouts/MetaData";
// import { useDispatch, useSelector } from "react-redux";
// import { useEffect, useState } from "react";
// import { getProducts } from "../actions/productsActions";
// import Loader from "./layouts/Loader";
// import Product from "./product/Product";
// import { toast } from "react-toastify";
// import Pagination from "react-js-pagination";




// export default function Home() {

//     const dispatch = useDispatch();
//     const { products,loading,error,productsCount,resPerPage } = useSelector((state) => state.productsState);
//     const [ currentPage, setCurrentPage ] = useState(1);


//     console.log(currentPage);

//     const setCurrentPageNo = (pageNo) => {
//     setCurrentPage(pageNo);
// }

//    useEffect(() => {

//     if (error) {
//         return toast.error(error)
//     }
//         dispatch(getProducts());
//     }, [error,dispatch]);



//   return (
//     <Fragment>
//     {loading ? <Loader /> : 
//         <Fragment>    
//             <MetaData title={'Products'} />

//             <h1 id="products_heading">Latest Products</h1>

//                 <section id="products" className="container mt-5">
//                     <div className="row">
//                         {products && products.map((product) => (
//                         <Product key={product._id} product={product}/>
//                     ))}
//                     </div>
//                 </section>

//                 {productsCount > 0 ?
//                 <div className="d-flex justify-content-center mt-5">
//                     <Pagination

//                     activePage={currentPage}
//                     onChange={setCurrentPageNo}
//                     totalItemsCount={productsCount}
//                     itemsCountPerPage={resPerPage}
//                     nextPageText={"NEXT"}
//                     firstPageText={"FIRST"}
//                     lastPageText={"LAST"}
//                     itemClass={'page-item'}
//                     linkClass={'page-link'}
//                     />
//                 </div> : null }

//         </Fragment>
//     }
//     </Fragment>
//   );
// }




import { Fragment } from "react/jsx-runtime";
import MetaData from "./layouts/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getProducts } from "../actions/productActions";
import Loader from "./layouts/Loader";
import Product from "./product/Product";
import { toast } from "react-toastify";
import Pagination from "react-js-pagination";

export default function Home() {
  const dispatch = useDispatch();
  const { products, loading, error, productsCount, resPerPage } = useSelector(
    (state) => state.productsState
  );
  const [currentPage, setCurrentPage] = useState(1);

  const setCurrentPageNo = (pageNo) => {
    setCurrentPage(pageNo);
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      return;
    }

    dispatch(getProducts(null,null, null, null, currentPage)); // ✅ Pass current page to action
  }, [dispatch, error, currentPage]); // ✅ Add currentPage to dependency array

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Products"} />

          <h1 id="products_heading">Latest Products</h1>

          <section id="products" className="container mt-5">
            <div className="row">
              {products &&
                products.map((product) => (
                  <Product col={3} key={product._id} product={product} />
                ))}
            </div>
          </section>

          {productsCount > resPerPage && (
            <div className="d-flex justify-content-center mt-5">
              <Pagination
                activePage={currentPage}
                onChange={setCurrentPageNo}
                totalItemsCount={productsCount}
                itemsCountPerPage={resPerPage}
                nextPageText={"NEXT"}
                firstPageText={"FIRST"}
                lastPageText={"LAST"}
                itemClass={"page-item"}
                linkClass={"page-link"}
              />
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
}