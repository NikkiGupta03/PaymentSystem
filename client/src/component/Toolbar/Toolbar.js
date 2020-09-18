import React from 'react';
import './Toolbar.css';
const toolbar = props =>(
<header className="toolbar">
<nav className="toolbar_navigation">
    <div></div>
    <div className ="toolbar_logo"><a href="/"> The LOGO</a></div>
    <div className="toolbar_navigation_items">
        <ul>
            <li><a href="/">Products</a></li>
        </ul>
    </div>
</nav>
</header>
);
export default toolbar;