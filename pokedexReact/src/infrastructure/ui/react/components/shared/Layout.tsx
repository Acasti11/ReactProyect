import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../shared/Header';
import { Footer } from '../shared/Footer';

export const Layout: React.FC = () => {
    return (
        <>
        <Header />
        <Outlet />
        <Footer />
        </>
    );
};
