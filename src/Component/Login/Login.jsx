import { useState } from "react";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import registerbanner from "../../Images/registerbanner.webp";
import { Link, useNavigate } from "react-router-dom";
import {
  BannerImg,
  Container,
  Form,
  FormInput,
  FormInputDiv,
  RegiName,
  SubmitButton,
} from "./Login.element";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("mor_2314");
  const [password, setPassword] = useState("83r5^_");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let sampleData = {
        username: email,
        password: password
    }
      let res = await fetch("https://fakestoreapi.com/auth/login", {
        method:'POST',
        body: JSON.stringify(sampleData),
      });
      let data = await res.json();
      console.log("data", data)
      toast.success("Login SuccessFull", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      navigate("/cart");

    } catch (error) {
      console.log(error.message);
      toast.error("LOGIN FAILED (check your email or password)", {
        theme: "colored",
      });
      navigate("/cart");
    }
  };

  return (
    <Container>
      <BannerImg src={registerbanner} alt="" />
      <Form onSubmit={handleSubmit} className="formInput">
        <RegiName>LOGIN</RegiName>
        <FormInputDiv>
          <FormInput
            className="inputtt"
            name="email"
            type="text"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FormInput
            className="inputtt"
            name="password"
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormInputDiv>
        <SubmitButton>Submit</SubmitButton>
        <ToastContainer
          position="top-right"
          autoClose={5500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </Form>

   
    </Container>
  );
};

export default Login;
