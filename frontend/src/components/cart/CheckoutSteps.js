import { Link } from "react-router-dom";

export default function CheckoutSteps({shipping, confirmOrder, payment}) {
  return (
    <div className="checkout-progress d-flex justify-content-center mt-5">
        {
            shipping ? 
            <Link to="/shipping">
                <div className="triangle2-active"></div>
                <div className="step active-step">Shipping Info</div>
                <div className="triangle-active"></div>
            </Link> :
            <Link to="/shipping">
                <div className="triangle2-incompleted"></div>
                <div className="step incomplete">Shipping Info</div>
                <div className="triangle-incompleted"></div>
            </Link>
        }
        

        

        {
            confirmOrder ? 
            <Link to="/order/confirm">
                <div className="triangle2-active"></div>
                <div className="step active-step">Confirm order</div>
                <div className="triangle-active"></div>
            </Link> :
            <Link to="/order/confirm">
                <div className="triangle2-incompleted"></div>
                <div className="step incomplete">Confirm order</div>
                <div className="triangle-incompleted"></div>
            </Link>
        }


        {
            payment ? 
            <Link to="/payment">
                <div className="triangle2-active"></div>
                <div className="step active-step">Payment</div>
                <div className="triangle-active"></div>
            </Link> :
            <Link to="/payment">
                <div className="triangle2-incompleted"></div>
                <div className="step incomplete">Payment</div>
                <div className="triangle-incompleted"></div>
            </Link>
        }
      </div>
  );
}