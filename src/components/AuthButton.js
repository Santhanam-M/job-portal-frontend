const AuthButton = (props) => {
    const { value, button } = props;
    return (
        <div>
            <input
                type="submit"
                value={value}
                className={`btn btn-lg btn-rounded button-auth mt-3 ${button}`}
            />
        </div>
    );
};

export default AuthButton;
