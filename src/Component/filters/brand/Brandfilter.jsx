import React, { useState, useEffect, useContext } from "react";
import { CategoryDiv } from "./Brandfilterstyle";
import { FilterContext } from "../../../context/FilterContext";
import SearchIcon from '@mui/icons-material/Search';
function Brandfilter() {
  const [datas, setData] = useState([]);
  const { handleEvent ,isChecked, data} = useContext(FilterContext);
  let categArr = [];
  useEffect(() => {
    const getData = async () => {
      let res = await fetch("https://fakestoreapi.com/products");
      let data = await res.json();
      setData(data);
    };
    getData();
  }, []);

  datas.map((ele) => {
    categArr.push(ele.category);
  });

  categArr = [...new Set(categArr)];
  const handleChange = (e) => {
    handleEvent(e.target.name, e.target.checked);
  };
  const handldeRemove =() => {
   
  }
  return (
    <div style={{ width: "30%", textAlign: "left", margin: "10px" }}>
      <div style={{display:"flex" , justifyContent:"space-between"}}> <h3>FILTERS</h3>
        {data.length>0?<h3 style={{color:"#e7396a"}} onClick={handldeRemove}>Clear All</h3>:<h3></h3> }</div>
    

      <div style={{borderTop:".03px solid lightgrey",borderRight:".03px solid lightgrey",borderBottom:".03px solid lightgrey"}}>
       <div style={{display:"flex", alignItems:"center" , justifyContent:"space-between"}}> <h3>CATEGORY</h3> <div style={{background:"#f5f5f6" , color:"grey" ,marginRight:"5px" , borderRadius:"50%"}}><SearchIcon style={{cursor:"pointer"}}/></div></div>
        {categArr.map((ele, i) => {
          return (
            <CategoryDiv key={i}>
              <input type="checkbox" onChange={handleChange} name={ele}  style={{cursor:"pointer"}}></input>
              <label style={{textTransform:"capitalize",cursor:"pointer"}}>{ele}</label>
            </CategoryDiv>
          );
        })}
      </div>
    
    </div>
  );
}

export default Brandfilter;
