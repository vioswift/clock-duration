import React from 'react';

class NavBar extends React.Component {
render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <img src={process.env.PUBLIC_URL + 'clock-duration-logo.png'} alt="ClockDuration Logo" className="px-md-1 img-responsive" width="32" height="auto"/>
                <a className="navbar-brand" href="https://clockduration.com/">ClockDuration</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            
                        </li>
                    </ul>
                </div>
                </nav>
            </div> 
        );
    }
}

export default NavBar;