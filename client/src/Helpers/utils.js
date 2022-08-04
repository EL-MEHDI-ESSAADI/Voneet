export function getCatchErrorFunction(rateLimitErrorMessage, errorIntro, addToast, customFunction = () => {}) {
   return function (error) {
      let cause = "something went wrong in the app";

      console.error(error);

      if (error.response && error.response.data) {
         // auth error, or semething went wrong on the server
         if (error.response.status === 400 || error.response.status === 401 || error.response.status === 500)
            cause = error.response.data.message;
         // rate limit error
         if (error.response.status === 429) {
            cause = `${
               rateLimitErrorMessage || "We reached the rate limit from twitter on doing this process"
            }, the rate limit will reset on ${new Date(error.response.data.reset * 1000).toLocaleString()}`;
         }
      } else if (error.request) {
         // server not responding
         cause = "the server not responding";
      }
      addToast({ text: errorIntro + cause, variant: "danger" });
      customFunction(cause, error);
   };
}
