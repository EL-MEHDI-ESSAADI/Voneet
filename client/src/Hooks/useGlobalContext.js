import { useContext } from "react";
import { appContext } from "Contexts";

function useGlobalContext() {
   return useContext(appContext);
}

export default useGlobalContext;
