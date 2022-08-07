import { PageWrapper, SectionHeader } from "Components";
import { PageSection } from "Components/styles";
import { useState } from "react";
import SearchForm from "./SearchForm";
import Spaces from "./Spaces";

function SpacesSearchPage() {
   const [spacesData, setSpacesData] = useState([]);

   return (
      <PageWrapper>
         <PageSection className="text-center text-sm-start">This feautre let you find your desired spaces by a halpful search optoins.</PageSection>
         <PageSection>
            <SectionHeader>Search options</SectionHeader>
            <SearchForm setSpacesData={setSpacesData} />
         </PageSection>
         <PageSection>
            <SectionHeader>Spaces</SectionHeader>
            {spacesData.length ? (
               <Spaces spacesData={spacesData} />
            ) : (
               <div className="text-center text-sm-start">Your searched spaces will be showen here.</div>
            )}
         </PageSection>
      </PageWrapper>
   );
}

export default SpacesSearchPage;
