import Auth_img from '../images/Auth_img.jpg'

const AuthLayout = (props) => {
    
    const {children} = props

    return (
        <div className="container-fluid">
            <div className="row align-items-center justify-content-center">
                <div className="col-lg-6 col-md-6">
                    <img src={Auth_img} width={'85%'} />
                </div>

                <div className="col-12 col-xl-4 col-lg-6 col-md-6 col-sm-10 mt-3 p-4 card rounded-5">
                    {props.children}
                </div>    
            </div>
        </div>
    );
};

export default AuthLayout;
