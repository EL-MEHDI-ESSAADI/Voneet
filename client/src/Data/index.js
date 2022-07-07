import { BiMessageDetail } from "react-icons/bi";
import { ImHome3 } from "react-icons/im";

export const navLinksStore = [
   {
      headerText: "",
      links: [
         {
            to: "/",
            Icon: ImHome3,
            text: "home",
         },
      ],
   },
   {
      headerText: "Features",
      links: [{ to: "/defaultMessage", Icon: BiMessageDetail, text: "Default Message" }],
   },
];
