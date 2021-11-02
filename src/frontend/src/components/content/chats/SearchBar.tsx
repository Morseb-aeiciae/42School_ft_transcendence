import React, { Component } from "react";
import { Formik } from "formik";

export default class SearchBar extends Component {
  submit = (values: any, actions: any) => {
    console.log(values);
  };

  render() {
    return (
      <Formik
        onSubmit={this.submit}
        initialValues={{ query: "", type: "public", protected: "no" }}
      >
        {({ handleSubmit, handleChange, handleBlur, isSubmitting }) => (
          <form
            className="d-flex flex-column flex-fill m-2"
            onSubmit={handleSubmit}
          >
            <div className="d-flex flex-row p-1">
              <input
                name="query"
                className="flex-fill form-control mr-2"
                placeholder="Search ..."
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <select
                name="type"
                className="mr-2 form-control w-25"
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value="public">Public</option>
                <option value="private">Private</option>
              </select>
            </div>
            <div className="d-flex flex-row p-1">
              <div className="d-flex flex-row flex-grow-1 align-items-end justify-content-evenly">
                <p>
                  <input
                    type="radio"
                    name="protected"
                    id="false"
                    value="no"
                    checked
                    onChange={handleChange}
                  />
                  <label htmlFor="false"> no protected</label>
                </p>
                <p>
                  <input
                    type="radio"
                    name="protected"
                    id="true"
                    value="yes"
                    onChange={handleChange}
                  />
                  <label htmlFor="false"> protected</label>
                </p>
              </div>
              <button
                className="btn btn-outline-secondary btn-lg"
                type="submit"
                disabled={isSubmitting}
              >
                Submit
              </button>
            </div>
          </form>
        )}
      </Formik>
    );
  }
}
