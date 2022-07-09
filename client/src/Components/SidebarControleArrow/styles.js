import styled, { css } from "styled-components";
import { ImArrowRight2 } from "react-icons/im";

export const Button = styled.button.attrs({ className: "rounded-circle btn btn-primary" })`
   padding: 0.3rem;
   box-shadow: 0px 2px 4px var(--primary-shadow-color);

   ${({ floatInXlScreen }) => {
      if (floatInXlScreen)
         return css`
            @media (min-width: 1200px) {
               position: absolute;
               right: 0;
               transform: translate(50%);
            }
         `;
   }};
`;

const CustomImArrowRight2 = ({ className }) => <ImArrowRight2 className={className} arria-hidden="true" />;

export const ArrowIcon = styled(CustomImArrowRight2)`
   display: block;
   transition: var(--secondary-trn-1);

   ${({ rotateToLeft }) => {
      if (rotateToLeft)
         return css`
            transform: rotate(-180deg);
         `;
   }}
`;
