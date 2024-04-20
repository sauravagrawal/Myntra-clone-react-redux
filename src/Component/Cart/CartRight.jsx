import { LocalOfferOutlined } from "@mui/icons-material";
import React from "react";
import {
  AllPriceDiv,
  AppCou,
  ApplyButton,
  ApplyCoupondiv,
  CartRight,
  CoupDis,
  CoupDisDiv,
  CoupDisrs,
  CouponApplyDiv,
  CoviFee,
  CoviFeediv,
  CoviFeeKM,
  CoviFeers,
  Dmrp,
  DmrpDiv,
  Dmrprs,
  NameC,
  PlaceorderButton,
  PlaceorderDiv,
  PriceDetailsT,
  TotalAmount,
  TotalAmountdiv,
  TotalAmountrs,
  TotalPriceDiv,
} from "./CartRight.element";
import { useSelector } from "react-redux";
const CartRightS = () => {
  const bagData = useSelector((state) => state.bag.bagData);

  let totalAmount = 0;
  bagData?.map(
    (e) =>
      (totalAmount += Math.floor(
        Number(e.price)
      ))
  );

  let totalDiscount = totalAmount;

  const placeOrder = () => {
    console.log("Order placed")
  };
  return (
    <CartRight>
      <CouponApplyDiv>
        <NameC>Coupons</NameC>
        <ApplyCoupondiv>
          <LocalOfferOutlined sx={{ width: "25px", height: "25px" }} />
          <AppCou>Apply Coupons</AppCou>
          <ApplyButton>APPLY</ApplyButton>
        </ApplyCoupondiv>
      </CouponApplyDiv>
      <AllPriceDiv>
        <PriceDetailsT>PRICE DETAILS ({bagData.length} Items)</PriceDetailsT>
        <DmrpDiv>
          <Dmrp>Discount on MRP</Dmrp>
          <Dmrprs>-₹{totalDiscount}</Dmrprs>
        </DmrpDiv>
        <CoupDisDiv>
          <CoupDis>Coupon Discount</CoupDis>
          <CoupDisrs>Apply Coupon</CoupDisrs>
        </CoupDisDiv>
        <CoviFeediv>
          <CoviFee>Convenience Fee</CoviFee>
          <CoviFeeKM>Know More</CoviFeeKM>
          <CoviFeers>FREE</CoviFeers>
        </CoviFeediv>
      </AllPriceDiv>
      <TotalPriceDiv>
        <TotalAmountdiv>
          <TotalAmount>Total Amount</TotalAmount>
          <TotalAmountrs>₹{totalAmount}</TotalAmountrs>
        </TotalAmountdiv>
        <PlaceorderDiv>
          <PlaceorderButton onClick={placeOrder}>PLACE ORDER</PlaceorderButton>
        </PlaceorderDiv>
      </TotalPriceDiv>
    </CartRight>
  );
};

export default CartRightS;
