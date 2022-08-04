import React from "react";
import styled from "styled-components";
import { featuresStore } from "Data";
import SingleFeature from "./SingleFeature";

const StyledFeatures = styled.div.attrs({ className: "mt-5 m-0 row justify-content-center gap-4" })``;

function Features() {
   const featuresElements = featuresStore.map((featureItem) => (
      <SingleFeature key={featureItem.id} {...featureItem} />
   ));
   return <StyledFeatures>{featuresElements}</StyledFeatures>;
}

export default Features;
