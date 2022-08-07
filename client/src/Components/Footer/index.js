import React from "react";
import { contactPlatforms } from "Data";
import styled from "styled-components";

const YEAR = new Date().getFullYear();
const TWITTER_CONTACT_lINK = contactPlatforms.get("twitter").link;

// styles
const StyledFooter = styled.footer.attrs({
   className:
      "bg-white px-4 py-3 d-flex d-flex gap-2 flex-column flex-sm-row align-items-center justify-content-between",
})``;

// components
const ContactLink = ({ link, Icon, text, name, type = "primary" }) => (
   <a
      href={link}
      target={name === "email" ? "_self" : "_blanck"}
      className={`link-${type}`}
      aria-label={name}
      rel="noreferrer"
   >
      {Icon ? <Icon size="1.5rem" aria-hidden="true" /> : text}
   </a>
);

function Footer() {
   const contactLinksElements = Array.from(contactPlatforms.entries()).map(([name, { link, Icon }]) => (
      <ContactLink key={name} name={name} link={link} Icon={Icon} type="secondary" />
   ));

   return (
      <StyledFooter>
         <div className="d-flex gap-2">{contactLinksElements}</div>
         <div className="text-center">
            ©{YEAR} VONEET, Made with ♥ by{" "}
            <ContactLink key="twitter" name="twitter" link={TWITTER_CONTACT_lINK} text="VON" />.
         </div>
      </StyledFooter>
   );
}

export default Footer;
