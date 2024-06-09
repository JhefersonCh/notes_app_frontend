/* eslint-disable react/prop-types */

import "./FormContainer.css"

export const FormContainer = ({ children }) => {
  return (
    <div className="d-flex justify-content-center row m-0">
      <div className="col-10 col-lg-4 border border-1 p-4 rounded-4 form-container">
        {children}
      </div>
    </div>
  )
}