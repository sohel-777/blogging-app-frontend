import axios from "axios";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { toast } from 'react-toastify';



function UserCard({ userData, updateFollowStatus }) {

    const [follow, setFollow] = useState(userData.follow)
    const token = localStorage.getItem("token");

    const handleFollow = (userId) => {
        axios
            .post(
                `${process.env.REACT_APP_BACKEND_URL}/follow/follow-user`,
                {
                    followingUserId: userId,
                },
                {
                    headers: {
                        "X-Acciojob": token,
                    },
                }
            )
            .then((res) => {
                if (res.data.status === 200) {
                    updateFollowStatus(userId, true);
                    toast.success("Follow Successful");
                } else {
                    console.log(res.data.message)
                }
            })
            .catch((err) => {
                alert(err);
            });
    };

    const handleUnfollow = (userId) => {
        axios
            .post(
                `${process.env.REACT_APP_BACKEND_URL}/follow/unfollow-user`,
                {
                    followingUserId: userId,
                },
                {
                    headers: {
                        "X-Acciojob": token,
                    },
                }
            )
            .then((res) => {
                if (res.data.status === 200) {
                    updateFollowStatus(userId, false);
                } else {
                    console.log(res.data.message);
                }
            })
            .catch((err) => {
                alert(err);
            });
    };

    return (
        <Card className="custom-card" style={{ width: "18rem", marginRight: "20px" }}>
            <Card.Body>
                <Card.Title>{userData.name}</Card.Title>
                <Card.Text>{userData.username}</Card.Text>
                <Card.Text>{userData.email}</Card.Text>

                {follow ? (

                    <Button variant={follow ? "danger" : "primary"} onClick={() => { handleUnfollow(userData._id); setFollow(!follow) }}>Unfollow</Button>

                ) : (

                    <Button variant={follow ? "danger" : "primary"} onClick={() => { handleFollow(userData._id); setFollow(!follow) }}>Follow</Button>


                )}
            </Card.Body>
        </Card>
    );
}



export default UserCard;