import React, { useState } from "react";
import {
  AddBoxOutlined,
  Clear,
  IndeterminateCheckBoxOutlined,
} from "@mui/icons-material";
import {
  Brand,
  CartItemDiv,
  Filtercontainer,
  FilterPM,
  Imagediv,
  ItemIamge,
  ItemInfoDiv,
  Name,
  Oprice,
  PercentOff,
  Price,
  PriceDis,
  RButton,
  RemoveButtonDiv,
} from "./Cart.element";
import {
  deleteBagData,
} from "../../redux/Cart/action";
import { useDispatch } from "react-redux";
const CartItemsDiv = ({
  image,
  id,
  title,
  off_price,
  discount,
  brand,
}) => {
  const [count , setCount] = useState(0)
  const dispatch = useDispatch();
  const handleModelBagClose = (id) => {
    dispatch(deleteBagData(id));
  };
  const increaseQ = () => {
    setCount(count + 1);
  };
  const decreaseQ = () => {

    setCount(count - 1);
  };

  return (
    <CartItemDiv>
      <Imagediv>
        <ItemIamge src={image}/>
      </Imagediv>
      <ItemInfoDiv>
        <Brand>{brand}</Brand>
        <Name>{title}</Name>
        <Filtercontainer>
          
          <FilterPM>
            <AddBoxOutlined
              onClick={() => increaseQ(id, 0)}
              sx={{
                backgroundColor: "#fff",
                color: "black",
                marginRight: "5px",
              }}
            />
            <p>{count}</p>
            <IndeterminateCheckBoxOutlined
              onClick={() => decreaseQ(id, count)}
              sx={{
                color: "black",
                backgroundColor: "#fff",
                marginLeft: "5px",
              }}
            />
          </FilterPM>
        </Filtercontainer>
        <PriceDis>
          <Price>
            ₹{Math.floor(Number(off_price) * ((100 - Number(discount)) / 100))}
          </Price>
          <Oprice>{`₹${off_price}`}</Oprice>
          <PercentOff>{`${discount}% OFF`}</PercentOff>
        </PriceDis>
      </ItemInfoDiv>
      <RemoveButtonDiv>
        <RButton onClick={() => handleModelBagClose(id)}>
          <Clear sx={{ color: "black", width: "25px", height: "25px" }} />
        </RButton>
      </RemoveButtonDiv>
    </CartItemDiv>
  );
};

export default CartItemsDiv;
