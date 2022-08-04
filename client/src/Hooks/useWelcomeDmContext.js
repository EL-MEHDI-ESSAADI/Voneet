import { useContext } from "react";
import { welcomeDmContext } from "Contexts";

function useWelcomeDmContext() {
   return useContext(welcomeDmContext);
}

export default useWelcomeDmContext;
