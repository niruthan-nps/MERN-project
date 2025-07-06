// import Search from "./Search";
// import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";
// import React from "react";
// import { Dropdown, DropdownButton, Figure, Image } from "react-bootstrap";


// export default function Header() {

//   // const { user, isAuthenticated } = useSelector((state) => state.auth);
//   const { user, isAuthenticated } = useSelector((state) => state.authState || {});

//     return (<nav className="navbar row">
//       <div className="col-12 col-md-3">
//         <div className="navbar-brand">
//           <Link to="/">
//           <img width="150px" alt = "logo" src="/images/logo.png" />
//           </Link>
//         </div>
//       </div>

//       <div className="col-12 col-md-6 mt-2 mt-md-0">
//         <Search/>
//       </div>

//       <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">

//         { isAuthenticated ? 
//         (
//           <DropdownButton className="d-inline">
//             <Dropdown.Toggle variant="default text-white pr-5" id="dropdown-basic">
//               <Figure className="avatar avatar-nav">
//                 <Image
//                   src={user.avatar?? "./images/default_avatar.png"}
//                   // roundedCircle
//                   width="50px"
//                 />
//               </Figure>
//               <span>
//                 {user.name}
//               </span>
//             </Dropdown.Toggle>
//             <Dropdown.Menu>
//               <Dropdown.Item className="text-danger">Log out</Dropdown.Item>

//             </Dropdown.Menu>
//           </DropdownButton>
//         ) :
//           <Link to="/login" className="btn" id="login_btn">Login</Link>
//         }
        

//         <span id="cart" className="ml-3">Cart</span>
//         <span className="ml-1" id="cart_count">2</span>
//       </div>
//     </nav>)
// }



import Search from "./Search";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import React from "react";
import { Dropdown, Figure, Image } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { logout } from "../../actions/userActions";

export default function Header() {
  const { user, isAuthenticated } = useSelector((state) => state.authState || {});
  const dispatch = useDispatch();
  const logoutHandler = () => {
    // Dispatch the logout action here
    dispatch(logout);
    console.log("User logged out");
  };


//   if (user) {
//   console.log("User name:", user.name);
//   console.log("Avatar URL:", user.avatar);
// }

  return (
    <nav className="navbar row">
      <div className="col-12 col-md-3">
        <div className="navbar-brand">
          <Link to="/">
            <img width="150px" alt="logo" src="/images/logo.png" />
          </Link>
        </div>
      </div>

      <div className="col-12 col-md-6 mt-2 mt-md-0">
        <Search />
      </div>

      <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
        {isAuthenticated  ? (
          <Dropdown className="d-inline">
            <Dropdown.Toggle id="dropdown-basic" className="default text-white pr-5" variant="dark">
              <Figure className="avatar avatar-nav d-inline-block align-middle m-0 mr-2">
                <Image
                 src={user.avatar || "/images/default_avatar.png"}
                  roundedCircle
                  width="40"
                />
                
              </Figure>
              <span className="text-white">{user.name}</span>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item className="text-danger" onClick={logoutHandler}>Log out</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        ) : (
          <Link to="/login" className="btn btn-dark" id="login_btn">
            Login
          </Link>
        )}

        <span id="cart" className="ml-3">Cart</span>
        <span className="ml-1" id="cart_count">2</span>
      </div>
    </nav>
    
  );

}

