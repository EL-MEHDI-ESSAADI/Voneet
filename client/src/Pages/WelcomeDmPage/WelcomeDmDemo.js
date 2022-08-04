import Modal from "react-bootstrap/Modal";
import welcomeDmDemoGif from "Assets/welcomeDmDemo.gif";

function WelcomeDmDemo({ isDemoOpen, closeDemo }) {
   return (
      <Modal show={isDemoOpen} onHide={closeDemo} size="md" centered>
         <Modal.Header closeButton>
            <Modal.Title>Demo</Modal.Title>
         </Modal.Header>
         <Modal.Body>
            <img src={welcomeDmDemoGif} alt="demo" />
         </Modal.Body>
      </Modal>
   );
}

export default WelcomeDmDemo;
