import styled, { css } from "styled-components";

const ScalableText = styled.span`
   display: inline-block;
   transition: var(--secondary-trn-1);

   ${({ shrink }) => {
      if (shrink)
         return css`
            font-size: 0;
            transform: translateX(-100%) scale(0) !important;
            opacity: 0 !important;
         `;
   }}
`;

export default ScalableText;
