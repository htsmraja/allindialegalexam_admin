// import { Fragment } from "react";
// import { Container, Row } from "reactstrap";
// import LoginSlider from "./component/login-slider";
// import LoginTabs from "./component/login-tabs";
// import { useAuthContext } from "../../helper/AuthProvider";

// const Login = () => {

//   const { initialLoading, user } = useAuthContext()

//   if (initialLoading === true) {
//     return null
//   }

//   return (
//     <Fragment>
//       <div className="page-wrapper">
//         <div className="authentication-box">
//           <Container>
//             <Row>
//               <LoginSlider />
//               <LoginTabs />
//             </Row>
//           </Container>
//         </div>
//       </div>
//     </Fragment>
//   );
// };

// export default Login;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Card, Form, Button, Stack, InputGroup } from 'react-bootstrap';
import { FiUser, FiLock, FiArrowRight } from 'react-icons/fi';
import { IoMdEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";
import { useAuthContext } from "../../helper/AuthProvider";
const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { admin_login, loginLoading } = useAuthContext();
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const handleUserValue = (event) => {
    setFormValues({ ...formValues, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    admin_login(formValues);
  };
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   // Simulate login
  //   setTimeout(() => {
  //     setLoading(false);
  //     navigate('/');
  //   }, 1000);
  // };

  return (
    <div className="min-vh-100 w-100  bg-black d-flex align-items-center justify-content-center p-4 position-relative overflow-hidden" >
      {/* Background elements */}
      <div className="position-absolute top-0 start-0 w-100 h-100 overflow-hidden" style={{ zIndex: 0 }}>
        <div className="position-absolute rounded-full bg-warning bg-opacity-10 blur-xl" style={{ top: '-20%', left: '-10%', width: '50%', height: '50%', filter: 'blur(120px)' }}></div>
        <div className="position-absolute rounded-full bg-primary bg-opacity-10 blur-xl" style={{ bottom: '-10%', right: '-10%', width: '40%', height: '60%', filter: 'blur(150px)' }}></div>
      </div>

      <Card className="w-100 bg-dark border-secondary border-opacity-25 shadow-2xl position-relative" style={{ maxWidth: '420px', backgroundColor: '#111 !important', zIndex: 10 }}>
        <Card.Body className="p-4 p-md-5">
          <div className="text-center mb-5">
            <div className="d-inline-flex align-items-center justify-content-center bg-warning rounded-3 p-2 mb-4" style={{ width: '68px', height: '68px' }}>
              <img src="/logo.jpg" alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <h2 className="text-white fw-bold mb-2">Welcome Back</h2>
            <p className="text-secondary small mb-0">Sign in to your Control Center</p>
          </div>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-4">
              <Form.Label className="text-secondary small fw-bold mb-2">EMAIL ADDRESS</Form.Label>
              <InputGroup className="bg-black border-secondary border-opacity-50 rounded overflow-hidden">
                <InputGroup.Text className="bg-transparent border-0 text-secondary pe-0 ps-3">
                  <FiUser size={18} />
                </InputGroup.Text>
                <Form.Control
                  type="email"
                  placeholder="admin@example.com"
                  className="bg-transparent border-0 text-white shadow-none py-2 px-3"
                  value={formValues.email}
                  name="email"
                  onChange={handleUserValue}
                  required
                />
              </InputGroup>
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label className="small text-secondary fw-bold">PASSWORD</Form.Label>
              <InputGroup className="bg-black border-secondary rounded overflow-hidden">
                <InputGroup.Text className="bg-transparent border-0 text-secondary"><FiLock size={18} /></InputGroup.Text>
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  className="bg-transparent border-0 text-white shadow-none"
                  placeholder="••••••••"
                  value={formValues.password}
                  onChange={handleUserValue}
                  name='password'
                />
                <InputGroup.Text
                  className="bg-transparent border-0 text-secondary"
                  style={{ cursor: "pointer" }}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <IoIosEyeOff size={18} /> : <IoMdEye size={18} />}
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <Form.Check
                type="checkbox"
                id="remember-me"
                label="Remember me"
                className="text-secondary small custom-checkbox"
                required
              />
            </div>

            <Button
              variant="warning"
              type="submit"
              className="w-100 py-3 fw-bold text-black border-0 shadow-sm d-flex align-items-center justify-content-center gap-2 mb-1"
              disabled={loading}
            >
              {loginLoading ? (
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              ) : (
                <>Log In <FiArrowRight /></>
              )}
            </Button>
          </Form>
        </Card.Body>
      </Card>

      <style>{`
                .custom-checkbox .form-check-input { background-color: #1a1a1a; border-color: #333; }
                .custom-checkbox .form-check-input:checked { background-color: #fcca0c; border-color: #fcca0c; }
                .shadow-2xl { box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5); }
                .blur-xl { filter: blur(100px); }
            `}</style>
    </div>
  );
};

export default Login;
