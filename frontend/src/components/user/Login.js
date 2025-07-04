import { Fragment } from "react";
import MetaData from "../layouts/MetaData";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { clearAuthError, login } from "../../actions/userActions"; // Adjust the import path as necessary
import { useSelector } from "react-redux"; // Import useSelector to access the Redux state
import { useEffect } from "react";
import { toast } from "react-toastify"; // Import toast for error notifications
import { useNavigate } from "react-router-dom"; // Import useNavigate to redirect after login


export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Import useNavigate to redirect after login
    const { loading, error,isAuthenticated } = useSelector((state) => state.authState); // Adjust the state slice name as necessary

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(email, password));
        console.log("Login submitted with:", { email, password });
    };


    useEffect(() => {

    if (isAuthenticated) {
        navigate('/'); // Redirect to account page if authenticated
    }
    if (error) {
        toast(error,{
            type: "error",
            onOpen: () => {dispatch(clearAuthError())}
        });
    }
    }, [error, isAuthenticated, dispatch]); // Add isAuthenticated and navigate to dependencies

  return (
    <Fragment>
        <MetaData title={`Login`} />
            <div className="row wrapper">
            <div className="col-10 col-lg-5">
            <form onSubmit={submitHandler} className="shadow-lg">
                <h1 className="mb-3">Login</h1>
                <div className="form-group">
                <label htmlFor="email_field">Email</label>
                <input
                    type="email"
                    id="email_field"
                    className="form-control"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                </div>
    
                <div className="form-group">
                <label htmlFor="password_field">Password</label>
                <input
                    type="password"
                    id="password_field"
                    className="form-control"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                </div>

                <a href="#" className="float-right mb-4">Forgot Password?</a>
    
                <button
                id="login_button"
                type="submit"
                className="btn btn-block py-3"
                disabled={loading} // Disable button if loading
                >
                LOGIN
                </button>

                <a href="#" className="float-right mt-3">New User?</a>
            </form>
            </div>
            </div>
    </Fragment>
    
  );
}