import React, { useState } from "react";
// import axios from "axios";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
//redux hooks dispatching
import { useDispatch } from 'react-redux';
import * as actions from '../../actions';

function RatingModal(props) {
    const [userRating, setUserRating] = useState(0);

    const dispatch = useDispatch();

    const closeRatingModal = () => {
        setUserRating(0);
        props.toggleModal();
    };

    const submit = () => {
        console.log(userRating);
        //props.rateTruck(userRating);
        dispatch(actions.rateTruck(userRating));
        closeRatingModal();
    };

    return (
        <Modal className="text-center" isOpen={props.show}>
            <ModalHeader>Leave a Rating</ModalHeader>
            <ModalBody>
                <div className="pt-3 stars">
                    {[1, 2, 3, 4, 5].map((starCount) => {
                        if (starCount <= userRating) {
                            return (
                                <i
                                    onClick={() => setUserRating(starCount)}
                                    style={{
                                        color: "gold",
                                        fontSize: "1.8rem",
                                    }}
                                    className="fas fa-star"
                                ></i>
                            );
                        } else {
                            return (
                                <i
                                    onClick={() => setUserRating(starCount)}
                                    style={{
                                        color: "gold",
                                        fontSize: "1.8rem",
                                    }}
                                    className="far fa-star"
                                ></i>
                            );
                        }
                    })}
                </div>
                <div className="mt-4">
                    <Button onClick={submit} color="primary">
                        Submit
                    </Button>
                    <Button onClick={closeRatingModal}>Close</Button>
                </div>
            </ModalBody>
        </Modal>
    );
}

export default RatingModal;
