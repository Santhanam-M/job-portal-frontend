const AuthFormRadio = (props) => {
    const { fieldName, fieldValue, label, formik, isLast } = props;

    //updating classname
    const getClassName = (field) => {
        if (
            formik.touched[fieldName] &&
            formik.values[fieldName] &&
            !formik.errors[fieldName]
        ) {
            return "is-valid";
        } else if (formik.errors[fieldName]) {
            return "is-invalid";
        }
    };

    return (
        <div className="me-5">
            <input
                type="radio"
                name={fieldName}
                value={fieldValue}
                checked={formik.values[fieldName] === fieldValue}
                onChange={formik.handleChange}
                className={`${getClassName(fieldName)} mb-4 me-2`}
            />
            {label}
            {isLast && formik.errors[fieldName] && (
                <div className="invalid-feedback mb-3">{formik.errors[fieldName]}</div>
            )}
        </div>
    );
};

export default AuthFormRadio;
