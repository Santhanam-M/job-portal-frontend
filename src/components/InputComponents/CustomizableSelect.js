import CreatableSelect from "react-select/creatable";

const CustomizableSelect = (props) => {
    const { label, fieldName, formik, options, placeHolder } = props;

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

    const handleChange = (option) => {
        formik.setFieldValue(
            fieldName,
            option ? option.map((ele) => ele.value) : []
        );
    };

    const selectedOptions = (formik.values[fieldName]).map((ele) => {
        return { value: ele, label: ele };
    });

    return (
        <div className="col-lg-6 col-md-6 p-3">
            <label className="fw-bold">{label}</label>
            <CreatableSelect
                isMulti
                isClearable
                components={{ DropdownIndicator: () => null, Menu: () => null, IndicatorSeparator: () => null }}
                options={options}
                placeholder={placeHolder}
                value={selectedOptions || []}
                onChange={handleChange}
                className={`${getClassName(fieldName)}`}
            />
            {formik.errors[fieldName] && (
                <div className="invalid-feedback mt-1">{formik.errors[fieldName]}</div>
            )}
        </div>
    );
};

export default CustomizableSelect;
