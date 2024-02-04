const DashBoard = (props) =>{

    const {title, iconClass, bgColor, value} = props

    return (
            <div className='col-lg-4 col-md-4'>
                <div className='card'>
                    <div className='card-header mt-2 text-center'>
                        <h6 className={`text-uppercase text-${bgColor} fw-bold`}>{title}</h6>
                    </div>

                    <div className={`card-footer bg-${bgColor} text-center`}>
                        <div className='row align-items-center'>
                            <div className='col-lg-6'>
                                <i className={`${iconClass} fa-4x text-white`}></i>
                            </div>

                            <div className='col-lg-6'>
                                <h3 className='display-5 mt-3 text-white'>{value}</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>)
}

export default DashBoard