import React from "react";

function Header() {
  return (
    <header>
      <h1>Travel Advisor</h1>
      {window.screen.width <= 768 ? (
        <h2>Use 2 fingers to zoom the map</h2>
      ) : window.screen.width <= 1200 ? (
        <h2>Use ctrl + scroll to zoom the map</h2>
      ) : (
        ""
      )}
      <h2>Travel your way</h2>
    </header>
  );
}

export default Header;
