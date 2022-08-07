import axios from "axios";
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { APP_API } from "Data";
import { getCatchErrorFunction } from "Helpers/utils";
import { useGlobalContext } from "Hooks";

const FORM_DATA_DEFAULT_VALUE = {
   query: "",
   state: "live",
};

function SearchForm({ setSpacesData }) {
   const [formData, setFormData] = useState(FORM_DATA_DEFAULT_VALUE);
   const [isLoading, setIsLoading] = useState(false);
   const { addToast } = useGlobalContext();

   function handleChange(e) {
      const { name, value } = e.target;
      setFormData((oldValue) => ({ ...oldValue, [name]: value }));
   }

   function handleSubmit(e) {
      e.preventDefault();

      // validation
      if (isLoading) return;
      if (!formData.query.trim() || !formData.state) return;

      // get and add spaces
      getAndAddSpaces(formData);
   }

   function getAndAddSpaces(spacesOptions) {
      // start loading
      setIsLoading(true);
      axios
         .post(APP_API + "/spaces", spacesOptions, { withCredentials: true })
         .then(({ data }) => {
            if (data.length) setSpacesData(data);
            addToast(
               data.length
                  ? {
                       text: "We got your spaces successfully",
                       variant: "success",
                    }
                  : { text: "We didn't find any spaces that matchs your search", variant: "danger" }
            );
         })
         .catch(
            getCatchErrorFunction(
               "we have reached the rate limit (900-Requests/15-min) on getting spaces from twitter",
               "Fail to get your spaces because ",
               addToast
            )
         )
         .finally(() => {
            setIsLoading(false);
            setFormData(FORM_DATA_DEFAULT_VALUE);
         });
   }

   return (
      <Form onSubmit={handleSubmit}>
         <Form.Group className="mb-3" controlId="query">
            <Form.Label>Query</Form.Label>
            <Form.Control
               type="text"
               required
               placeholder="Your search term"
               name="query"
               value={formData.query}
               onChange={handleChange}
            />
            <Form.Text className="text-muted">
               This can be any text (including mentions and Hashtags) present in the title of the Spaces.
            </Form.Text>
         </Form.Group>
         <Form.Group className="mb-3" controlId="state">
            <Form.Label>State</Form.Label>
            <Form.Select
               aria-label="select state of spaces"
               name="state"
               value={formData.state}
               onChange={handleChange}
            >
               <option value="live">Live</option>
               <option value="scheduled">Scheduled</option>
               <option value="all">All</option>
            </Form.Select>
            <Form.Text className="text-muted">The state of spaces.</Form.Text>
         </Form.Group>
         <button className="btn btn-primary">
            {isLoading ? (
               <>
                  <div className="spinner-border text-light spinner-border-sm me-1" role="status">
                     <span className="visually-hidden">Loading...</span>
                  </div>
                  Searching
               </>
            ) : (
               "Search"
            )}
         </button>
      </Form>
   );
}

export default React.memo(SearchForm);
