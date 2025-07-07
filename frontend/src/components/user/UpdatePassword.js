import { useState } from "react";
import { useDispatch } from "react-redux";
import { updatePassword as updatePasswordAction } from "../../actions/userActions";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { clearAuthError } from "../../actions/userActions";



export default function UpdatePassword() {

    const [Password, setPassword] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const dispatch = useDispatch();
    const { isUpdated, error } = useSelector((state) => state.authState || {});


    const submitHandler = (e) => {
        e.preventDefault();
        // Dispatch the action to update the password

        const formData = new FormData();
        formData.append('oldPassword', oldPassword);
        formData.append('password', Password);
        dispatch(updatePasswordAction(formData))
     };

    useEffect(() => {
            
            if (isUpdated) {
                toast("Password updated successfully", {
                    type: "success"
                });

                setOldPassword('');
                setPassword('');


                return;
            }
            if (error) {
                toast(error, {
                    type: "error",
                    onOpen: () => {
                        dispatch(clearAuthError());
                    }
                });
                return;
            }
        }, [isUpdated, error, dispatch]);



    return (
        <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form onSubmit={submitHandler} claclassNamess="shadow-lg">
                        <h1 className="mt-2 mb-5">Update Password</h1>
                        <div className="form-group">
                            <label htmlFor="old_password_field">Old Password</label>
                            <input
                                type="password"
                                id="old_password_field"
                                className="form-control"
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="new_password_field">New Password</label>
                            <input
                                type="password"
                                id="new_password_field"
                                className="form-control"
                                value={Password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <button type="submit" className="btn update-btn btn-block mt-4 mb-3">Update Password</button>
                    </form>
                </div>
            </div>
    );
}