const TextInputField = (props) => {
    const { fieldName, fieldType, label, formik, fieldClass } = props;

    //updating classname
    const getClassName = (field) => {
        if (
            formik.touched[field] &&
            formik.values[field] &&
            !formik.errors[field]
        ) {
            return "is-valid";
        } else if (formik.errors[field]) {
            return "is-invalid";
        }
    };

    return (
        <div className="col-lg-6 col-md-6 form-group p-3">
            <label className="fw-bold">{label}</label>
            <input
                type={fieldType}
                name={fieldName}
                value={formik.values[fieldName]}
                onChange={formik.handleChange}
                className={`form-control ${getClassName(fieldName)} ${fieldClass}`}
            />
            {formik.errors[fieldName] && (
                <div className="invalid-feedback">{formik.errors[fieldName]}</div>
            )}
        </div>
    );
};

export default TextInputField
