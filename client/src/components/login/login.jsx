import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import './login.css'
function Login() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showCreateAccountModal, setShowCreateAccountModal] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [createEmail, setCreateEmail] = useState('');
  const [createPassword, setCreatePassword] = useState('');

  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

  const handleShowLoginModal = () => setShowLoginModal(true);
  const handleShowCreateAccountModal = () => setShowCreateAccountModal(true);

  return (
    <>
    <br />
    <br />
      <Button className="login-btn" variant="primary" onClick={handleShowLoginModal}>
        Login
      </Button>

      <Modal show={showLoginModal} onHide={() => setShowLoginModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="loginEmail">
              <Form.Control
                type="email"
                placeholder="Enter Email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}

              />
              <Form.Control.Feedback type="invalid">
                Please enter a valid email address.
              </Form.Control.Feedback>
            </Form.Group>
            
            <Form.Group controlId="loginPassword">
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}

              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" className="login-btn" onClick={() => setShowLoginModal(false)}>
            Login
          </Button>
        </Modal.Footer>
      </Modal>
      <br />
      <br />
      <Button className="create-account-btn"variant="success" onClick={handleShowCreateAccountModal}>
        Create Account
      </Button>

      <Modal show={showCreateAccountModal} onHide={() => setShowCreateAccountModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="createEmail">
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={createEmail}
                onChange={(e) => setCreateEmail(e.target.value)}
                isInvalid={createEmail && !emailRegex.test(createEmail)}
              />
              <Form.Control.Feedback type="invalid">
                Please enter a valid email address.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="createPassword">
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={createPassword}
                onChange={(e) => setCreatePassword(e.target.value)}
                isInvalid={createPassword && !passwordRegex.test(createPassword)}
              />
              <Form.Control.Feedback type="invalid">
                Password must contain at least one lowercase letter, one uppercase letter, one number, and be at least 6 characters long.
              </Form.Control.Feedback>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" className="login-btn" onClick={() => setShowCreateAccountModal(false)}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Login;
