import Select from "react-select";

const SelectMenu = (props) => {

    const {fieldName, options, formik, label, fieldClass} = props

    // updating classname
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
            <Select
                options={options}
                value={options.find(option => option.value === formik.values[fieldName]) || ''}
                onChange={(option) =>
                    formik.setFieldValue(fieldName, option ? option.value : "")
                }
                className={`${getClassName(fieldName)} ${fieldClass}`}
            />
            {formik.errors[fieldName] && (
                <div className="invalid-feedback mt-1">{formik.errors[fieldName]}</div>
            )}
        </div>
    );
};

export default SelectMenu;
