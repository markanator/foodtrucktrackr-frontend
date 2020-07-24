import React from "react";
import {Card, CardBody, CardImg, CardTitle, CardText, Button} from "reactstrap";

export default function MenuItem(props){
    return (
        <Card className="p-2 h-100 menu-item">
            <CardImg style={{"objectFit": "cover"}} src="https://bigoven-res.cloudinary.com/image/upload/w_300,c_fill,h_250/spagetti-120fed.jpg" height="125"/>
            <CardBody className="pl-0 pr-0">
                <CardTitle>Spagetti Stuff</CardTitle>
                <CardText>
                    So schreitet in dem engen Bretterhaus (Theater, Bühne) Den ganzen Kreis der Schöpfung aus, Und wandelt.
                </CardText>
                <CardText className="text-success">
                    $4.99
                </CardText>
                <Button color="primary">View Item</Button>
            </CardBody>
        </Card>
    )
}