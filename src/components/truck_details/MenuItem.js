import React from "react";
import {
    Card,
    CardBody,
    CardImg,
    CardTitle,
    CardText,
    Button,
} from "reactstrap";
import { useHistory } from 'react-router-dom';

export default function MenuItem({ menuItem }) {
    const {push} = useHistory();

    return (
        <Card className="p-2 h-100 menu-item">
            <CardImg
                style={{ objectFit: "cover" }}
                src={menuItem.menu_item_photo}
                height="125"
            />
            <CardBody className="pl-0 pr-0">
                <CardTitle>{menuItem.menu_item_name}</CardTitle>
                <CardText>{menuItem.menu_item_description}</CardText>
                <CardText className="text-success">
                    ${menuItem.menu_item_price}
                </CardText>
                {/* <Button color="primary">View Item</Button> */}
            </CardBody>
            {/* <Button onClick={push(`/edit-menu-item/${menuItem.id}`)} color="primary">Edit Item</Button> */}
        </Card>
    );
}
