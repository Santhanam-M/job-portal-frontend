import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // ES6

const RichTextEditor = (props) => {
    const { label, fieldName, formik, fieldClass } = props;

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
        <div className="col-lg-12 col-md-12 form-group p-3 mb-5">
            <label className="fw-bold">{label}</label>
            <ReactQuill
                theme="snow"
                value={formik.values[fieldName]}
                onChange={(option)=> formik.setFieldValue(fieldName, option ? option : '')}
                className={`${getClassName(fieldName)} ${fieldClass}`}
            />
            {formik.errors[fieldName] && (
                <div className="invalid-feedback mt-5">{formik.errors[fieldName]}</div>
            )}
        </div>
    );
};

export default RichTextEditor;
