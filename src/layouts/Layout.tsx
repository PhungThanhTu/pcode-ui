import { Box } from '@mui/material';
import NavBar from '../components/NavBar';
import React from 'react';
import Footer from '../components/Footer';

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
