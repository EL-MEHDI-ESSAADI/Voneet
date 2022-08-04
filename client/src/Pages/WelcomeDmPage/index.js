import { useState, useCallback } from "react";
import { PageWrapper } from "Components";
import InfoSection from "./InfoSection";
import WelcomeDmDemo from "./WelcomeDmDemo";
import ControlAndDisplayWelcomeDmsSection from "./ControlAndDisplayWelcomeDmsSection";

/*
   "welcomeDm" stand for "welcome direct message"
   "welcomeDms" stand for "welcome direct messages"
*/

function WelcomeDmPage() {
   const [isDemoOpen, setIsDemoOpen] = useState(false);

   const openDemo = useCallback(() => {
      setIsDemoOpen(true);
   }, []);

   function closeDemo() {
      setIsDemoOpen(false);
   }

   return (
      <PageWrapper>
         <InfoSection openDemo={openDemo} />
         <WelcomeDmDemo closeDemo={closeDemo} isDemoOpen={isDemoOpen} />
         <ControlAndDisplayWelcomeDmsSection />
      </PageWrapper>
   );
}

export default WelcomeDmPage;
