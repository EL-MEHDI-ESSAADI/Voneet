import { BiMessageDetail } from "react-icons/bi";
import { ImHome3 } from "react-icons/im";
import { AiFillGithub, AiFillTwitterCircle, AiFillLinkedin } from "react-icons/ai";
import { MdEmail } from "react-icons/md";
import { RiMic2Line } from "react-icons/ri";

export const featuresStore = [
   {
      name: "Welcome message",
      description:
         "Welcome messages let you greet people and set expectations as they enter a Direct Message conversation without requiring people to send the first message",
      Icon: BiMessageDetail,
      path: "/welcomeMessage",
      id: 1,
   },
   {
      name: "Spaces search",
      description: "This feautre let you find your desired spaces by a halpful search optoins.",
      Icon: RiMic2Line,
      path: "/spacesSearch",
      id: 2,
   },
];

export const navLinksStore = [
   {
      headerText: "",
      links: [
         {
            name: "home",
            Icon: ImHome3,
            path: "/",
            id: 0,
         },
      ],
   },
   {
      headerText: "Features",
      links: featuresStore,
   },
];

export const contactPlatforms = new Map([
   ["twitter", { link: "https://twitter.com/Von__Mehdi", Icon: AiFillTwitterCircle }],
   ["github", { link: "https://github.com/EL-MEHDI-ESSAADI", Icon: AiFillGithub }],
   ["linkedin", { link: "https://www.linkedin.com/in/el-mehdi-essaadi", Icon: AiFillLinkedin }],
   ["email", { link: "mailto:mehdiessaadion@gmail.com", Icon: MdEmail }],
]);

export const APP_API = process.env.NODE_ENV === "production" ? "/api" : "http://localhost:5000";

export const TWITTER_SPACE_BASE_LINK = "https://twitter.com/i/spaces/";
export const TWITTER_PROFILE_BASE_LINK = "https://twitter.com/";
