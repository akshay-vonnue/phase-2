import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import "./LoginPage.css";
import { useNavigate } from "react-router";
// import { Navigate } from "react-router";

function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { errorMessage, login } = useLogin();
  const navigate = useNavigate()

  async function handleLogin(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();

    const result = await login(formData.email, formData.password);
    console.log("is navigating",result)
    if (result.success) {
          console.log("success fully navifating") 
          navigate("/", { replace: true });
    }
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ): void {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  return (
    <div className="no-items">
      <form onSubmit={handleLogin}>
        <div className="login-fields">
          <div className="login-field-wrapper">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              name="email"
              onChange={handleChange}
            />
          </div>
          <div className="login-field-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={handleChange}
            />
          </div>
          <button type="submit">login</button>
        </div>
      </form>
      {errorMessage && <span>{errorMessage}</span>}
    </div>
  );
}

export default LoginPage;
