const AuthFormfield = (props) => {
    const { iconType, fieldType, fieldName, placeHolder, formik } = props;

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

    //show TickMark
    const showTickMark = (field) => {
        return (
            formik.touched[field] && formik.values[field] && !formik.errors[field]
        );
    };

    return (
        <div className="mb-5">
            <div className="input-group">
                <span className="input-group-text">
                    <i className={`fas fa-${iconType} fa-lg fa-fw`}></i>
                </span>
                <input
                    type={fieldType}
                    name={fieldName}
                    placeholder={placeHolder}
                    value={formik.values[fieldName]}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`form-control ${getClassName(fieldName)}`}
                />
                {/* This is the tick mark */}
                {showTickMark(fieldName) && (
                    <span className="input-group-text">
                        <i className="fas fa-check text-sucess"></i>
                    </span>
                )}
                {formik.errors[fieldName] && (
                    <div className="invalid-feedback">{formik.errors[fieldName]}</div>
                )}
            </div>
        </div>
    );
};

export default AuthFormfield;
