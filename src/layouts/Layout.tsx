import NavBar from '../components/NavBar';
import React from 'react';
import Footer from '../components/Footer';
import { Outlet } from 'react-router-dom';


interface PropsWithChildrenOnly {
  children: React.ReactNode;
}

const Layout: React.FunctionComponent<PropsWithChildrenOnly> = (props: PropsWithChildrenOnly) => {

  return (
    <React.Fragment>
      <NavBar />
      {props.children}
      <Footer />
    </React.Fragment>
  );
};

export default Layout;
