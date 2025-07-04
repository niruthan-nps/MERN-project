
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function Search() {

const [keyword, setKeyword] = useState('');
const navigate = useNavigate();
const location = useLocation();

const searchHander = (e) => {
    e.preventDefault();
    navigate(`/search/${keyword}`); // Use template literals to include keyword in the URL
}

const clearKeyword = () => {
    setKeyword('');
    
}

useEffect(() => {
    if (location.pathname === '/') {
        clearKeyword();
    }
}, [location]); // Clear keyword when navigating to search page

    return (

            <form onSubmit={searchHander}>
                <div className="input-group">
                    <input
                    type="text"
                    id="search_field"
                    className="form-control"
                    placeholder="Enter Product Name ..."
                    onChange={(e) => {setKeyword(e.target.value)}}
                    value={keyword}
                    />
                    <div className="input-group-append">
                    <button id="search_btn" className="btn" type="submit">
                    <i className="fa fa-search" aria-hidden="true"></i>
                    </button>
                    </div>
                </div>
            </form>
    );
}