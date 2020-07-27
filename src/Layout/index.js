import React, { Component } from "react";

import Header from "../components/universal/Header";
import Footer from "../components/universal/Footer";

export default class Layout extends Component {
    render() {
        return (
            <>
                <Header />
                {this.props.children}
                <Footer />
            </>
        );
    }
}
