import { PageSection } from "Components/styles";
import { SectionHeader } from "Components";

function InfoSection({ openDemo }) {
   return (
      <PageSection>
         <SectionHeader>What are Welcome Messages?</SectionHeader>
         <p>
            Welcome messages let you greet people and set expectations as they enter a Direct Message conversation
            without requiring people to send the first message, see{" "}
            <button className="link-primary" onClick={openDemo}>
               demo.
            </button>
         </p>
         <p className="mt-2">
            When a Welcome Message is set as active, it will be presented to the user in the following scenarios:
         </p>
         <ul className="mt-2 list-styled">
            <li>Direct Message compose view opened for the first time.</li>
            <li>Direct Message compose view opened for the first time since leaving a conversation.</li>
            <li>Direct Message compose view opened after no message activity for 7 days.</li>
         </ul>
         <p className="mt-2">
            <strong>Note: </strong>
            You can add any number of welcome messages, but just one can be active and in order your active welcome
            message to work you should allow message requests from everyone in your twitter account, you can do
            that by going to your{" "}
            <strong>
               twitter account {">"} settings and privacy {">"} privacy and safety {">"} direct messages
            </strong>
            &nbsp;and then torn on <strong>Allow message requests from everyone</strong>.
         </p>
      </PageSection>
   );
}

export default InfoSection;
