import React, { useState } from "react";
// import axios from "axios";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";

function RatingModal(props) {
    const [userRating, setUserRating] = useState(0);

    const closeRatingModal = () => {
        setUserRating(0);
        props.toggleModal();
    };

    const submit = () => {
        console.log('userRating', userRating);
        closeRatingModal();
    };

    return (
        <Modal className="text-center" isOpen={props.show}>
            <ModalHeader>Leave a Rating</ModalHeader>
            <ModalBody>
                <div className="pt-3 stars">
                    {[1, 2, 3, 4, 5].map((starCount, index) => {
                        if (starCount <= userRating) {
                            return (
                                <i
                                    key={index}
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
                                    key={index}
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
