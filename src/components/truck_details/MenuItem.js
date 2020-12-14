import React from "react";
import { useHistory } from "react-router-dom";
import { Card, CardBody, CardImg, CardText, CardTitle } from "reactstrap";

export default function MenuItem({ menuItem }) {
    const { push } = useHistory();


    return (
        <Card
            onClick={() => {
                push(`/edit-menu-item/${menuItem.id}`);
            }}
            className="p-2 h-100 menu-item"
        >
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
        </Card>
    );
}
