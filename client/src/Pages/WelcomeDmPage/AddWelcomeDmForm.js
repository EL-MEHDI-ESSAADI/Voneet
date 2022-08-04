import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { useGlobalContext, useWelcomeDmContext } from "Hooks";
import { APP_API } from "Data";
import axios from "axios";
import { getCatchErrorFunction } from "Helpers/utils";

const FORM_DATA_DEFAULT_VALUE = {
   name: "",
   text: "",
   isActive: true,
};

function AddWelcomeDmForm() {
   const [formData, setFormData] = useState(FORM_DATA_DEFAULT_VALUE);
   const [isLoading, setIsLoading] = useState(false);
   const setWelcomeDmsList = useWelcomeDmContext();

   const {
      user: { isLoggedin: isUserLoggedin },
      addToast,
   } = useGlobalContext();

   function handleChange(event) {
      const { name, value, type, checked } = event.target;

      setFormData((oldFormData) => ({
         ...oldFormData,
         [name]: type === "checkbox" ? checked : value,
      }));
   }

   function handleSubmit(e) {
      e.preventDefault();

      // validation
      if (isLoading) return;
      if (!isUserLoggedin) {
         addToast({ text: "You must login to add a welcome message", variant: "info" });
         return;
      }
      if (!formData.text.trim()) addToast({ text: "Direct message content can't be blank", variant: "danger" });
      if (!formData.name || !formData.text.trim()) return;

      // add the new welcomeMessage
      addWelcomeDm(formData);
   }

   function addWelcomeDm(welcomeMessageData) {
      // start loacing
      setIsLoading(true);
      axios
         .post(APP_API + "/welcomeMessages", welcomeMessageData, { withCredentials: true })
         .then(({ data: newWelcomeDm }) => {
            setWelcomeDmsList((oldWelcomeDmsList) => {
               /*
                  Create the newWelcomeDmsList that hold the elements of oldWelcomeDmsList 
                  if the newWelcomeDm is active, the old active welcomeDm will be unactive in newWelcomeDmsList
               */
               const newWelcomeDmsList = newWelcomeDm.isActive
                  ? oldWelcomeDmsList.map((item) => (item.isActive ? { ...item, isActive: false } : item))
                  : [...oldWelcomeDmsList];
               newWelcomeDmsList[newWelcomeDm.isActive ? "unshift" : "push"](newWelcomeDm);
               return newWelcomeDmsList;
            });

            addToast({
               text: "Welcome message added successfully",
               variant: "success",
            });
         })
         .catch(
            getCatchErrorFunction(
               "we have reached the rate limit on adding your welcome messages from twitter",
               "Fail to add your welcome message because ",
               addToast
            )
         )
         .finally(() => {
            setIsLoading(false);
            // reset the form
            setFormData(FORM_DATA_DEFAULT_VALUE);
         });
   }

   return (
      <Form onSubmit={handleSubmit}>
         <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
               type="text"
               pattern="^[A-Za-z0-9 _/-@#]{0,99}$"
               required
               placeholder="Welcome message name"
               name="name"
               value={formData.name}
               onChange={handleChange}
            />
            <Form.Text className="text-muted">
               A name to distinguish the welcome message from the others, must be alphanumeric (space, '_', '-',
               '@', and '#' allowed)
            </Form.Text>
         </Form.Group>
         <Form.Group className="mb-3" controlId="message">
            <Form.Label>Message</Form.Label>
            <Form.Control
               as="textarea"
               rows={4}
               required
               placeholder="Welcome message content"
               name="text"
               value={formData.text}
               onChange={handleChange}
            />
         </Form.Group>
         <Form.Group className="mb-3" controlId="isActive">
            <Form.Check
               type="switch"
               label="Make the new welcome message active"
               name="isActive"
               checked={formData.isActive}
               onChange={handleChange}
            />
         </Form.Group>
         <button className="btn btn-primary">
            {isLoading ? (
               <>
                  <div className="spinner-border text-light spinner-border-sm me-1" role="status">
                     <span className="visually-hidden">Loading...</span>
                  </div>
                  Adding
               </>
            ) : (
               "Add new"
            )}
         </button>
      </Form>
   );
}

export default React.memo(AddWelcomeDmForm);
