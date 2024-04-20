import React, { useEffect, useState, useContext } from "react";
import { MainDiv, CardDiv, DescDiv ,CountryDiv , BundlesDiv ,SizeDiv ,ContainerDiv , TopDiv} from "./cardItems";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { FilterContext } from "../../context/FilterContext";
import Sort from "../sort/Sort";
import { SortContext } from "../../context/Sortcontext";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {useNavigate} from "react-router-dom"
function Card() {
  const [flag, setflag] = useState(false);
  const { event } = useContext(FilterContext);
  const { isChecked, handleData } = useContext(FilterContext);
  const [datas, setData] = useState([]);
  const [newdata, setNewdata] = useState([]);
  const { state1, state2 } = useContext(SortContext)
  const [flagBundle , setFlagBundle] = useState(false);
  const [flagCountry , setFlagCountry] = useState(false)
  const [flagSize, setFlagSize] = useState(false)
  const navigate= useNavigate()
  var handleEnter = (e) => {
    setflag(true);
    e.mouse = true;
  };
  const handleLeave = (e) => {
    setflag(false);
    e.mouse = false;
  };
  const handleMove = (ele) => {
    navigate(`/singlemen/${ele.id}`)
    console.log(ele)
  }
  const handleEnterBundle=()=>{
    setFlagBundle(true)
  }
  const handleLeaveBundle=()=>{
    setFlagBundle(false)
  }
  const handleEnterCountry=()=>{
    setFlagCountry(true)
  }
  const handleLeaveCountry=()=>{
    setFlagCountry(false)
  }
  const handleEnterSize=()=>{
    setFlagSize(true)
  }
  const handleLeaveSize=()=>{
    setFlagSize(false)

  }
  useEffect(() => {
    const getData = async () => {
      let res = await fetch("https://fakestoreapi.com/products");
      let data = await res.json();
      setData(data);
    };
    getData();
  }, []);
  let filterData = [];
  useEffect(() => {
    if (event && isChecked) {
      filterData = datas.filter((ele) => ele.category == event);
      if (newdata.length > 0) {
        setNewdata([...filterData, ...newdata]);
      } else {
        setNewdata([...filterData]);
      }
    } else if (event && isChecked == false) {
      filterData = newdata.filter((ele) => ele.category != event);
      console.log(filterData);
      if (newdata) {
        setNewdata([...filterData]);
      } else {
        setData(datas);
      }
    } else {
      setData(datas);
    }
  }, [event, isChecked]);

  handleData(newdata);

  if (state1) {
    datas.sort((a,b)=>a.price-b.price)
  }
  else if (state2)
  {
    datas.sort((a,b)=>b.price-a.price)
    
    }

  return (
    <div>
      <TopDiv>
        <div style={{ display: "flex", gap:"20px",  marginLeft:"20px"}}>
          <BundlesDiv  onMouseEnter={handleEnterBundle} onMouseLeave={handleLeaveBundle} flag={flagBundle}>
            <p style={{ margin:"-2px 2px 2px 2px"  , alignItems :"center" , display:"flex" }}>Bundles <ExpandMoreIcon/> </p>
          </BundlesDiv>   
          <CountryDiv  onMouseEnter={handleEnterCountry} onMouseLeave={handleLeaveCountry} flag={flagCountry}>
            <p style={{margin:"-2px 2px 2px 2px" ,alignItems :"center" , display:"flex"}}>Country of Origin <ExpandMoreIcon/>  </p>
          </CountryDiv>
          <SizeDiv onMouseEnter={handleEnterSize} onMouseLeave={handleLeaveSize} flag={flagSize}> 
          <p style={{margin:"-2px 2px 2px 2px" ,alignItems :"center" , display:"flex"}}>Size  <ExpandMoreIcon/> </p>
          </SizeDiv>
        </div>
        <Sort />
      </TopDiv>

      <ContainerDiv>
        {!event && !isChecked
          ? datas.map((ele) => {
              return (
                <MainDiv
                  onMouseEnter={() => {
                    handleEnter(ele);
                  }}
                  onMouseLeave={() => {
                    handleLeave(ele);
                  }}
                  onClick={()=>{handleMove(ele)}}
                >
                  <CardDiv flag={ele.mouse}>
                    <img
                      src={`${ele.image}`}
                      style={{ width: "100%", height: "100%" }}
                    ></img>
                  </CardDiv>

                  {!ele.mouse ? (
                    <DescDiv flag={ele.mouse}>
                      <div
                        style={{
                          overflow: "hidden",
                          height: "35px",
                          margin: "-10px 8px",
                          textAlign: "left",
                        }}
                      >
                        <p style={{ fontWeight: "bold", fontSize: "12px" }}>
                          {ele.category}
                        </p>
                      </div>
                      <div
                        style={{
                          overflow: "hidden",
                          height: "32px",
                          margin: "-15px 8px",
                          textAlign: "left",
                        }}
                      >
                        <p
                          style={{
                            textTransform: "capitalize",
                            fontSize: "12px",
                          }}
                        >
                          {ele.title}
                        </p>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          justifyContent: "left",
                          margin: "auto 8px",
                          gap: "20px",
                        }}
                      >
                        <p
                          style={{ fontSize: "12px", fontWeight: "bold" }}
                        >{`Rs ${ele.price}`}</p>
                      </div>
                    </DescDiv>
                  ) : (
                    <DescDiv flag={ele.mouse}>
                      <div
                        style={{
                          height: "30px",
                          width: "80%",
                          border: "1px solid black",
                          margin: "5px auto 10px auto",
                          paddingLeft: "5px",
                          boxSizing: "border-box",
                          textAlign: "center",
                          display: "flex",
                          gap: "10px",
                          justifyContent: "center",
                          background: "#fff",
                          color: "black",
                        }}
                      >
                        <ShoppingBagIcon />
                        <p style={{ marginTop: "5px", fontWeight: "600" }}>
                          Add to Cart
                        </p>
                      </div>
                     
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "left",
                          margin: "-10px 8px",
                          position: "sticky",
                          gap: "20px",
                        }}
                      >
                        <p
                          style={{ fontSize: "12px", fontWeight: "bold" }}
                        >{`Rs ${ele.price}`}</p>
                      
                      </div>
                    </DescDiv>
                  )}
                </MainDiv>
              );
            })
          : newdata.length > 0
          ? newdata.map((ele) => {
              return (
                <MainDiv
                  onMouseEnter={() => {
                    handleEnter(ele);
                  }}
                  onMouseLeave={() => {
                    handleLeave(ele);
                  }}
                  onClick={()=>{handleMove(ele)}}
                >
                  <CardDiv flag={ele.mouse}>
                    <img
                      src={`${ele.image}`}
                      style={{ width: "100%", height: "100%" }}
                    ></img>
                  </CardDiv>

                  {!ele.mouse ? (
                    <DescDiv flag={ele.mouse}>
                      <div
                        style={{
                          overflow: "hidden",
                          height: "35px",
                          margin: "-10px 8px",
                          textAlign: "left",
                        }}
                      >
                        <p style={{ fontWeight: "bold", fontSize: "12px" }}>
                          {ele.category}
                        </p>
                      </div>
                      <div
                        style={{
                          overflow: "hidden",
                          height: "32px",
                          margin: "-15px 8px",
                          textAlign: "left",
                        }}
                      >
                        <p
                          style={{
                            textTransform: "capitalize",
                            fontSize: "12px",
                          }}
                        >
                          {ele.title}
                        </p>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          justifyContent: "left",
                          margin: "auto 8px",
                          gap: "20px",
                        }}
                      >
                        <p
                          style={{ fontSize: "12px", fontWeight: "bold" }}
                        >{`Rs ${ele.price}`}</p>
                       
                      </div>
                    </DescDiv>
                  ) : (
                    <DescDiv flag={ele.mouse}>
                      <div
                        style={{
                          height: "30px",
                          width: "80%",
                          border: "1px solid black",
                          margin: "5px auto 10px auto",
                          paddingLeft: "5px",
                          boxSizing: "border-box",
                          textAlign: "center",
                          display: "flex",
                          gap: "10px",
                          justifyContent: "center",
                          background: "#fff",
                          color: "black",
                        }}
                      >
                        <ShoppingBagIcon />
                        <p style={{ marginTop: "5px", fontWeight: "600" }}>
                          Add to Cart
                        </p>
                      </div>
                    
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "left",
                          margin: "-10px 8px",
                          position: "sticky",
                          gap: "20px",
                        }}
                      >
                        <p
                          style={{ fontSize: "12px", fontWeight: "bold" }}
                        >{`Rs ${ele.price}`}</p>
                      
                      </div>
                    </DescDiv>
                  )}
                </MainDiv>
              );
            })
          : datas.map((ele) => {
              return (
                <MainDiv
                  onMouseEnter={() => {
                    handleEnter(ele);
                  }}
                  onMouseLeave={() => {
                    handleLeave(ele);
                  }}
                  onClick={()=>{handleMove(ele)}}
                >
                  <CardDiv flag={ele.mouse}>
                    <img
                      src={`${ele.image}`}
                      style={{ width: "100%", height: "100%" }}
                    ></img>
                  </CardDiv>

                  {!ele.mouse ? (
                    <DescDiv flag={ele.mouse}>
                      <div
                        style={{
                          overflow: "hidden",
                          height: "35px",
                          margin: "-10px 8px",
                          textAlign: "left",
                        }}
                      >
                        <p style={{ fontWeight: "bold", fontSize: "12px" }}>
                          {ele.category}
                        </p>
                      </div>
                      <div
                        style={{
                          overflow: "hidden",
                          height: "32px",
                          margin: "-15px 8px",
                          textAlign: "left",
                        }}
                      >
                        <p
                          style={{
                            textTransform: "capitalize",
                            fontSize: "12px",
                          }}
                        >
                          {ele.title}
                        </p>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          justifyContent: "left",
                          margin: "auto 8px",
                          gap: "20px",
                        }}
                      >
                        <p
                          style={{ fontSize: "12px", fontWeight: "bold" }}
                        >{`Rs ${ele.price}`}</p>
                      
                      </div>
                    </DescDiv>
                  ) : (
                    <DescDiv flag={ele.mouse}>
                      <div
                        style={{
                          height: "30px",
                          width: "80%",
                          border: "1px solid black",
                          margin: "5px auto 10px auto",
                          paddingLeft: "5px",
                          boxSizing: "border-box",
                          textAlign: "center",
                          display: "flex",
                          gap: "10px",
                          justifyContent: "center",
                          background: "#fff",
                          color: "black",
                        }}
                      >
                        <ShoppingBagIcon />
                        <p style={{ marginTop: "5px", fontWeight: "600" }}>
                          Add to Cart
                        </p>
                      </div>
                     
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "left",
                          margin: "-10px 8px",
                          position: "sticky",
                          gap: "20px",
                        }}
                      >
                        <p
                          style={{ fontSize: "12px", fontWeight: "bold" }}
                        >{`Rs ${ele.price}`}</p>
                       
                      </div>
                    </DescDiv>
                  )}
                </MainDiv>
              );
            })}
      </ContainerDiv>
    </div>
  );
}
export default Card;
