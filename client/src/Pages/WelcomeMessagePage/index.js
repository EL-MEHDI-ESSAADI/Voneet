import { PageWrapper } from "Components";
import { PageSection } from "Components/styles";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import welcomeMessageDemo from "Assets/welcomeMessageDemo.gif";

function WelcomeMessagePage() {
   const [isDemoOpen, setIsDemoOpen] = useState(true);

   function closeDemo() {
      setIsDemoOpen(false);
   }

   function openDemo() {
      setIsDemoOpen(true);
   }

   return (
      <PageWrapper>
         <PageSection>
            <p>
               Welcome messages let you greet people and set expectations as they enter a Direct Message
               conversation without requiring people to send the first message, see{" "}
               <button className="link-primary" onClick={openDemo}>
                  demo.
               </button>
            </p>
            <p className="mt-2">
               When a Welcome Message is set as active, it will be presented to the user in the following
               scenarios:
            </p>
            <ul className="mt-2 list-styled">
               <li>Direct Message compose view opened for the first time.</li>
               <li>Direct Message compose view opened for the first time since leaving a conversation.</li>
               <li>Direct Message compose view opened after no message activity for 7 days.</li>
            </ul>
         </PageSection>

         <Modal show={isDemoOpen} onHide={closeDemo} size="md" centered>
            <Modal.Header closeButton>
               <Modal.Title>Demo</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <img src={welcomeMessageDemo} alt="demo" />
            </Modal.Body>
         </Modal>

         <PageSection>
            <Form>
               <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Enter your message </Form.Label>
                  <Form.Control type="email" placeholder="welcome message" />
                  {/* <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text> */}
               </Form.Group>
               <Button variant="primary" type="submit">
                  Add new
               </Button>
            </Form>
         </PageSection>
      </PageWrapper>
   );
}

export default WelcomeMessagePage;
