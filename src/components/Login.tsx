import { useFormik } from "formik";
import { FunctionComponent } from "react";
import * as yup from "yup";
import User from "../interfaces/User";
import { checkUser } from "../services/usersService";
import { Link, useNavigate } from "react-router-dom";
/* import Navbar from "./Navbar";*/
import { errorMsg, successMsg } from "../services/feedbacks";
import Footer from "./Footer";


interface LoginProps { setIsLoggedIn: Function; setIsBusiness: Function; }

const Login: FunctionComponent<LoginProps> = ({ setIsLoggedIn, setIsBusiness }) => {
  let navigate = useNavigate();
  let formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: yup.object({
      email: yup.string().required().email().min(5),
      password: yup.string().required().min(8)
    }),
    onSubmit: (values: User) => {
      checkUser(values).then((res) => {
        if (res.data.length) {
          setIsLoggedIn(true);
          sessionStorage.setItem("userData", JSON.stringify({ isLoggedIn: true, isBusiness: res.data[0].isBusiness, userID: res.data[0].id }));
          setIsBusiness(res.data[0].name);
          successMsg("You are log-in :)");
          navigate('/mycards');
        }
        else { errorMsg("Wrong email or password"); navigate('/Signin'); }
      }).catch((e) => { errorMsg("Wrong email or password"); console.log(e); }
      );
    }
  })
  return (
    <>
      <div className="container mt-5 col-md-4 text-center">
        <h3 className="display-3">LOGIN</h3>
        <form onSubmit={formik.handleSubmit}>
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              onBlur={formik.handleBlur}
            />
            <label htmlFor="floatingInput">Email address</label>
            {formik.touched.email && formik.errors.email && (
              <p className="text-danger">{formik.errors.email}</p>
            )}
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              name="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              onBlur={formik.handleBlur}
            />
            <label htmlFor="floatingPassword">Password</label>
            {formik.touched.password && formik.errors.password && (
              <p className="text-danger">{formik.errors.password}</p>
            )}
          </div>
          <button
            type="submit"
            className="btn btn-success w-100 my-3"
            disabled={!formik.dirty || !formik.isValid}
          >
            Login
          </button>
        </form>
        <Link to="/register">New user? Register here</Link>
      </div>
      <div className="container text-center">
      </div>
      <div className="container text-center">
        <button
          className="btn btn-primary m-2"
          onClick={() => {
            navigate("/businessregister");
          }}
        >
          Create Business Account
        </button>
      </div>
    </>
  );
};

export default Login;
