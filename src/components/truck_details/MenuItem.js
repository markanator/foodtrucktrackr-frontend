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
//redux hooks dispatching
import { useDispatch } from 'react-redux';
import * as actions from '../../actions';

export default function MenuItem({ menuItem }) {
    const {push} = useHistory();

    const dispatch = useDispatch();

    return (
        <Card onClick={() => {
            dispatch(actions.truckInQuestion(menuItem));
            push(`/edit-menu-item/${menuItem.id}`)
        }} className="p-2 h-100 menu-item">
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
