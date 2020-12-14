import React from "react";

import Header from "../components/universal/Header";
import Footer from "../components/universal/Footer";

export default function Layout({children}) {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    );
}
