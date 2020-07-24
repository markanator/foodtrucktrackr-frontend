import React from "react";
import {Card} from "reactstrap";

export default function AddMenuItem(props){
    return (
        <Card className="justify-content-center p-2 h-100 text-center menu-item">
            <i className="fas fa-plus"></i>
            <p>Add Item</p>
        </Card>
    )
}