import React from "react";
import { useLocation } from "react-router-dom";
import { Image, Button } from "react-bootstrap";

function Header() {
  const location = useLocation();
  const pageTitle = location.pathname.split("/").pop();

  return (
    <div className="header">
      <h1>{pageTitle}</h1>
      <Image src="https://example.com/user-avatar.jpg" roundedCircle />
      <Button variant="outline-secondary">Settings</Button>
    </div>
  );
}

export default Header;
