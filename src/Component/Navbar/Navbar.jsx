import React, { useContext } from "react";
import styled from "styled-components";

import { Link, useNavigate, NavLink } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { useSelector } from "react-redux";
import Badge from "@mui/material/Badge";
import { FilterContext } from "../../context/FilterContext";
import logo from "../../Images/myntra-1200x900.webp"
const MainDiv = styled.div`
  display: grid;
  grid-template-columns: 100px 500px 500px 200px;
  background-color: whitesmoke;
  justify-content: space-around;
  height: 80px;
  box-shadow: 0 4px 12px 0 rgb(0 0 0 / 5%);
`;
const Navlink = styled.div`
  text-decoration: none;
  padding: 5px;
  color: black;
`;
const linkStyle = {
  textDecoration: "none",
  padding: "10px",
  color: "black",
};
const divStyle = {
  position: "sticky",
  top: "0%",
  backgroundColor: "#ffffff",
  zIndex: "1",
};
const imgStyle = { height: "42px", margin: "20px", cursor: "pointer"};
const wish = { fontSize: "10px", paddingLeft: "20px" };
const wishIcon = { marginTop: "15px" };
const navStyles = { marginTop: "20px", padding: "10px" };
const searchBar = {
  display: "flex",
  marginTop: "25px",
  paddingLeft: "80px",
};
function Navbar() {
  const navigate = useNavigate()
  const userAuth = useSelector((state) => state.loginreq.userAuth);
  const { count } = useContext(FilterContext)
  return (
    <>
      <div style={divStyle}>
        <MainDiv>
          <div style={{}}>
            <img
              onClick={() => navigate("/")}
              style={imgStyle}
              src={logo}
              alt=""
            />
          </div>
          <div style={navStyles}>
          <NavLink to="/men" style={linkStyle}> MEN</NavLink>
          <NavLink to="#" style={linkStyle}> WOMEN</NavLink>
          <NavLink to="#" style={linkStyle}> KIDS</NavLink>
          <NavLink to="#" style={linkStyle}> HOME & LIVING</NavLink>
          <NavLink to="#" style={linkStyle}> BEAUTY</NavLink>
         
          </div>

          <div style={searchBar}>
            <div
              style={{
                backgroundColor: "#FFFFFF",
                height: "20px",
                marginTop: "2px",
              }}
            >
              <SearchIcon />
            </div>
            <div>
              <input
                type="text"
                placeholder="Search for products brands and more"
                style={{
                  width: "300px",
                  height: "22px",
                  background: "white",
                  marginTop: "0px",
                  border: "none",
                }}
              ></input>
            </div>
          </div>
          <div style={{ display: "flex", paddingLeft: "0px", gap: "20px" }}>
            <Link to="/login" style={{ textDecoration: "none" }}>
              <div style={{ fontSize: "10px", broder: "none", color: "black" }}>
                <PermIdentityIcon
                  style={{ marginTop: "15px", padding: "0px" }}
                />
                <br />
                profile
              </div>
            </Link>
            <div style={wish}>
              <FavoriteBorderIcon style={wishIcon} /> <br />
              wishlist
            </div>

            <div
              style={{
                fontSize: "10px",
                textDecoration: "none",
                color: "black",
                marginTop: "17px",
                paddingLeft: "10px",
              }}
            >
              {userAuth ? (
                <Link to="/cart" style={{ textDecoration: "none" }}>
                  <Badge color="secondary" badgeContent={count} >
                    <ShoppingBagOutlinedIcon style={{ color: "black" }} />
                  </Badge>

                  <br />
                  <div style={{ textAlign: "center", color: "black" }}>
                    cart
                  </div>
                </Link>
              ) : (
                <Link to="/login" style={{ textDecoration: "none" }}>
                  <Badge color="secondary" badgeContent={count} >
                    <ShoppingBagOutlinedIcon style={{ color: "black" }} />
                  </Badge>

                  <br />
                  <div style={{ textAlign: "center", color: "black" }}>
                    cart
                  </div>
                </Link>
              )}
            </div>
          </div>
        </MainDiv>
      </div>
    </>
  );
}

export default Navbar;
