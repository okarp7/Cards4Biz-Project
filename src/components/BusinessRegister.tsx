import { useFormik } from "formik";
import { FunctionComponent } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import User from "../interfaces/User";
import { addUser } from "../services/usersService";
import { successMsg } from "../services/feedbacks";
import { createCart } from "../services/cartsService";
import Footer from "./Footer";

interface BusinessRegisterProps { setIsLoggedIn: Function; setIsBusiness: Function; }

const BusinessRegister: FunctionComponent<BusinessRegisterProps> = ({ setIsLoggedIn, setIsBusiness }) => {
    let navigate = useNavigate();
    let formik = useFormik({
        initialValues: { email: "", password: "", name: "" },
        validationSchema: yup.object({
            name: yup.string().required().min(2),
            email: yup.string().required().email().min(5),
            password: yup.string().required().min(8),
        }),
        onSubmit: (values: User) => {
            addUser({ ...values, isBusiness: true })
                .then((res) => {
                    createUserCart(res.data.id);
                    navigate("/home");
                    sessionStorage.setItem(
                        "userData",
                        JSON.stringify({
                            isLoggedIn: true,
                            isBusiness: true,
                            userId: res.data.id,
                        })
                    );
                    setIsLoggedIn(true);
                    setIsBusiness(true);
                    successMsg("Your business account created successfully!");
                })
                .catch((err) => console.log(err));
        },
    });

    let createUserCart = (userId: number) => {
        createCart(userId).catch((err) => console.log(err));
    };
    return (
        <>
            <div className="container mt-3 col-md-4 text-center">
                <h3 className="display-3">Business Registration</h3>
                <h5 className="display-5">Create your business account</h5>
                <form onSubmit={formik.handleSubmit}>
                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            className="form-control"
                            id="floatingInputName"
                            placeholder="John"
                            name="name"
                            onChange={formik.handleChange}
                            value={formik.values.name}
                            onBlur={formik.handleBlur}
                        />
                        <label htmlFor="floatingInputName">Name</label>
                        {formik.touched.name && formik.errors.name && (
                            <p className="text-danger">{formik.errors.name}</p>
                        )}
                    </div>
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
                        className="btn btn-secondary w-100 my-3"
                        disabled={!formik.dirty || !formik.isValid}
                    >
                        Register
                    </button>
                </form>
                <Link to="/">Already have user? Login here</Link>
            </div>
            <Footer />
        </>
    );
};

export default BusinessRegister;
