import { useFormik } from "formik";
import { FunctionComponent } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import * as yup from "yup";
import Card from "../interfaces/Card";
import { addCard } from "../services/cardsService";
import { successMsg } from "../services/feedbacks";

interface AddCardProps {
  onHide: Function;
  refresh: Function;
}

const AddCard: FunctionComponent<AddCardProps> = ({
  onHide,
  refresh,
}) => {
  let navigate = useNavigate();
  let formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      address: "",
      phone: "",
      image: "",
    },
    validationSchema: yup.object({
      name: yup.string().required().min(2),
      description: yup.string().required().min(0),
      address: yup.string().required().min(2),
      phone: yup.string().required().min(2),
      image: yup.string().required().min(2),
    }),
    onSubmit: (values: Card) => {
      values.userId = JSON.parse(
        sessionStorage.getItem("userData") as string
      ).userId;
      addCard(values)
        .then(() => {
          onHide();
          successMsg("Card added successfully!");
          refresh();
          navigate("/mycards");
        })
        .catch((err) => console.log(err));
    },
  });



  return (
    <div className="container mt-3 text-center">
      <form onSubmit={formik.handleSubmit}>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="nameInput"
            placeholder="card name"
            name="name"
            onChange={formik.handleChange}
            value={formik.values.name}
            onBlur={formik.handleBlur}
          />
          <label htmlFor="nameInput">Name</label>
          {formik.touched.name && formik.errors.name && (
            <p className="text-danger">{formik.errors.name}</p>
          )}
        </div>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="descriptionInput"
            placeholder="description"
            name="description"
            onChange={formik.handleChange}
            value={formik.values.description}
            onBlur={formik.handleBlur}
          />
          <label htmlFor="descriptionInput">Description</label>
          {formik.touched.description && formik.errors.description && (
            <p className="text-danger">{formik.errors.description}</p>
          )}
        </div>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="addressInput"
            placeholder="address"
            name="address"
            onChange={formik.handleChange}
            value={formik.values.address}
            onBlur={formik.handleBlur}
          />
          <label htmlFor="addressInput">Address</label>
          {formik.touched.address && formik.errors.address && (
            <p className="text-danger">{formik.errors.address}</p>
          )}
        </div>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="phoneInput"
            placeholder="phone"
            name="phone"
            onChange={formik.handleChange}
            value={formik.values.phone}
            onBlur={formik.handleBlur}
          />
          <label htmlFor="phoneInput">Phone</label>
          {formik.touched.phone && formik.errors.phone && (
            <p className="text-danger">{formik.errors.phone}</p>
          )}
        </div>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="imageInput"
            placeholder="image"
            name="image"
            onChange={formik.handleChange}
            value={formik.values.image}
            onBlur={formik.handleBlur}
          />
          <label htmlFor="imageInput">Image</label>
          {formik.touched.image && formik.errors.image && (
            <p className="text-danger">{formik.errors.image}</p>
          )}
        </div>
        <button
          type="submit"
          className="btn btn-success w-100 my-3"
          disabled={!formik.dirty || !formik.isValid}
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default AddCard;
