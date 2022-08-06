import styled from "styled-components";
import { TWITTER_PROFILE_BASE_LINK, TWITTER_SPACE_BASE_LINK } from "../../Data";

// styles
const StyledSpace = styled.div`
   display: grid;
   align-content: center;
   justify-items: center;
   width: min(100%, 380px);
   min-height: 360px;
   padding: 1.5rem;
   border-radius: 0.5rem;
   text-align: center;
   background-color: var(--light-purple);

   * {
      color: white;
   }
`;

const HostImage = styled.img`
   width: 2.8rem;
   height: 2.8rem;
   border-radius: 50%;
   box-shadow: var(--secondary-shadow-color-1) 1.95px 1.95px 2.6px;

   &:not(:first-of-type) {
      margin-left: -0.3rem;
   }
`;

// components
const InfoText = ({ name, value }) => (
   <div className="mb-2">
      <strong className="text-capitalize">{name}: </strong> {value}
   </div>
);

const SpaceLink = ({ id, state }) => (
   <a
      className="mt-2 btn rounded-pill bg-white text-black"
      href={TWITTER_SPACE_BASE_LINK + id}
      target="_blank"
      rel="noreferrer"
   >
      {state === "live" ? "listen now" : "set a reminder on twitter"}
   </a>
);

const Hosts = ({ hostsData }) => (
   <>
      <div className="d-flex flex-wrap justify-content-center mb-2">
         {hostsData.map(
            (host) =>
               host.profile_image_url && (
                  <HostImage key={host.username} src={host.profile_image_url} alt={`${host.username} profile`} />
               )
         )}
      </div>
      <div className="mb-2 fw-bold">
         Hosted by
         {hostsData.map((host) => (
            <a
               key={host.username}
               className="link-light"
               href={TWITTER_PROFILE_BASE_LINK + host.username}
               target="_blank"
               rel="noreferrer"
            >
               {" "}
               @{host.username}
            </a>
         ))}
      </div>
   </>
);

function SingleSpace({ spaceData }) {
   return (
      <StyledSpace>
         <h5 className="mb-4 fst-italic">{spaceData.title}</h5>
         <Hosts hostsData={spaceData.hosts} />
         {spaceData.state === "live" && <InfoText name="Participant count" value={spaceData.participantCount} />}
         {spaceData.state === "live" && (
            <InfoText name="Started at" value={new Date(spaceData.startedAt).toLocaleString()} />
         )}
         {spaceData.state === "scheduled" && (
            <InfoText name="scheduled start" value={new Date(spaceData.scheduledStart).toLocaleString()} />
         )}
         {spaceData.topics && <InfoText name="Topics" value={spaceData.topics.join(", ")} />}
         {<InfoText name="is Ticketed" value={spaceData.isTicketed.toString()} />}
         {spaceData.lang && <InfoText name="Language" value={spaceData.lang} />}
         <SpaceLink id={spaceData.id} state={spaceData.state} />
      </StyledSpace>
   );
}

export default SingleSpace;
