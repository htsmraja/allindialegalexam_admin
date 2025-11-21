import { useState } from "react";
import { Eye, EyeOff } from "react-feather";
import {
  Button,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupText,
} from "reactstrap";
import { useAuthContext } from "../../../helper/AuthProvider";

const LoginForm = () => {
  const [showPassWord, setShowPassWord] = useState(false);
  const { admin_login, loginLoading } = useAuthContext();
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const handleUserValue = (event) => {
    setFormValues({ ...formValues, [event.target.name]: event.target.value });
  };

  const formSubmitHandle = (event) => {
    event.preventDefault();
    admin_login(formValues);
  };

  return (
    <Form className="form-horizontal auth-form" onSubmit={formSubmitHandle}>
      <FormGroup>
        <Input
          required
          onChange={handleUserValue}
          type="email"
          value={formValues.email}
          placeholder="Enter Email"
          name="email"
        />
      </FormGroup>
      <FormGroup>
        <InputGroup onClick={() => setShowPassWord(!showPassWord)}>
          <Input
            required
            onChange={handleUserValue}
            type={showPassWord ? "password" : "text"}
            name="password"
            value={formValues.password}
            placeholder="Password"
          />
          <InputGroupText>{showPassWord ? <EyeOff /> : <Eye />}</InputGroupText>
        </InputGroup>
      </FormGroup>

      <div className="form-button">
        <Button color="primary" type="submit" disabled={loginLoading}>
          {loginLoading ? "Loading..." : "Login"}
        </Button>
      </div>
    </Form>
  );
};

export default LoginForm;
