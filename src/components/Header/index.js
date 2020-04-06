import React from 'react';

import logo from '../../assets/star-wars-1.svg';

export default function Header() {
  return (
    <header>
      <nav
        className="navbar is-dark"
        role="navigation"
        aria-label="main navigation">
        <div className="container">
          <div className="navbar-brand">
            <img src={logo} alt="starwars" width={90} />
          </div>
        </div>
      </nav>
    </header>
  );
}
