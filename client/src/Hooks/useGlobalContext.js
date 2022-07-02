import { useContext } from "react";
import appContext from "Context/appContext";

function useGlobalContext() {
   return useContext(appContext);
}

export default useGlobalContext;
