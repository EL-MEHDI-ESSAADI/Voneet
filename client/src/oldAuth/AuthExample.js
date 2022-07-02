import React, { useEffect, useReducer, useState } from "react";
import axios from "axios";

const stateDefaultValue = {
   isLoading: true,
   isAppAuthorizedByUser: false,
   error: "",
   authLink: "",
   accessToken: "",
   accessSecret: "",
};

const API = "http://localhost:5000/";

function reducer(state, action) {
   switch (action.type) {
      case "authLink":
         return { ...state, isLoading: false, isAppAuthorizedByUser: false, error: "", authLink: action.value };
      default:
         break;
   }
}

function Auth({ redirect = "/" }) {
   const [state, dispatch] = useReducer(reducer, stateDefaultValue);
   const [inputValue, setInputValue] = useState("");

   useEffect(() => {
      axios.get(`${API}getAuthLink`, { withCredentials: true }).then(({ data }) => {
         dispatch({ type: "authLink", value: data.authLink || "" });
         console.log(data);
      });
   }, []);

   function handelSubmit(e) {
      e.preventDefault();
      axios.post(`${API}pinCheck`, {pin: inputValue}, {withCredentials: true})
      .then(({data}) => console.log(data))
   }
   function handelChange(e) {
      e.preventDefault();
      setInputValue(e.target.value);
   }

   if (state.isLoading) return <h1>...LOADING</h1>;
   if (state.isAppAuthorizedByUser) return <h1>You are authorizid</h1>;

   return (
      <div style={{ padding: "2rem" }}>
         <h1>Authantacation</h1>
         <p>
            please go to the{" "}
            <span>
               <a href={state.authLink} target="_blank" alt="sdf">
                  this link
               </a>
            </span>{" "}
            to Authantacation the app and come back to enter the pin
         </p>
         <h3>PIN</h3>
         <form onSubmit={handelSubmit}>
            <input type="text" onChange={handelChange} />
            <button>submet</button>
         </form>
      </div>
   );
}

export default Auth;
