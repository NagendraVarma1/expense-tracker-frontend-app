import { Outlet } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";

const RootLayout = () => {
  return (
    <Fragment>
        <h1 style={{textAlign: 'center'}}>EXPENSE TRACKER APP</h1>
      <Outlet />
    </Fragment>
  );
};

export default RootLayout;
