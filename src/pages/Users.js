import axios from "axios";
import React, { useEffect, useState } from "react";
// import UserCard from "../components/Users/UserCard";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const MyLazyComponet = React.lazy(() => import("../components/Users/UserCard"));

function Users() {
    const [users, setUsers] = useState([]);
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    console.log(users)
    useEffect(() => {

        if (!token) {
            navigate("/login");
        } else {
            axios.get(
                `${process.env.REACT_APP_BACKEND_URL}/user/get-all-users`, {
                headers: {
                    "X-Acciojob": token,
                },
            })
                .then((res) => {
                    if (res.data.status === 200) {
                        setUsers(res.data.data);
                    }
                });
        }
    }, [token]);

    const updateFollowStatus = (userId, followStatus) => {
        setUsers(prevUsers =>
            prevUsers.map(user =>
                user._id === userId ? { ...user, follow: followStatus } : user
            )
        );
    };

    return (
        <div style={{ margin: "auto" }}>
            <h1 style={{ textAlign: "center", margin: "20px" }}>Users</h1>
            <ToastContainer position="top-right" autoClose={500} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />

            <div style={{ padding: "20px", display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "15px" }}>
                {users.map((user, index) => (
                    <React.Suspense key={index} fallback={<div>Loading...</div>}>

                        <MyLazyComponet key={index} userData={user} updateFollowStatus={updateFollowStatus} />
                    </React.Suspense >
                ))}
            </div>
        </div>
    );
}


export default Users;