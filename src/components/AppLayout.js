import SideBar from "./SideBar";

const AppLayout = (props) => {

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-xl-3 col-lg-4">
          <SideBar />
        </div>

        <div className="col-xl-9 col-lg-8">
            {props.children}
        </div>
      </div>
    </div>
  );
};
export default AppLayout;
