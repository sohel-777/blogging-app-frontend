import { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from 'react-toastify';

function Register() {
    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (token) {
            navigate("/homepage");
        }
    }, [token, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        const userObj = {
            username,
            name,
            email,
            password,
        };

        const url = `${process.env.REACT_APP_BACKEND_URL}/user/register`;

        axios.post(url, userObj)
            .then((res) => {
                if (res.data.status === 201) {
                    setLoading(false);
                    toast.success("Registration Successful");
                    setTimeout(() => {
                        navigate("/login");

                    },560)

                } else {
                    toast.error(res.data.message);
                    setLoading(false)
                }
            })
            .catch((err) => {
                toast.error("An error occurred while registering");
                setLoading(false)
            });
    };

    return (
        <div id="background" className="container-fluid d-grid align-content-center justify-content-center">
            <div id="card" className="container shadow p-3 mb-5 bg-body-tertiary rounded p-5" style={{ margin: "50px" }}>
                <h1 className="text-center text-bold" style={{ marginBottom: "20px" }}>Register</h1>
                <ToastContainer position="top-right" autoClose={500} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />

                <Form className="d-flex flex-column align-content-center justify-content-center" onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control className="shadow-lg" type="text" placeholder="Enter Username" onChange={(e) => setUsername(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control className="shadow-lg" type="text" placeholder="Enter Name" onChange={(e) => setName(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control className="shadow-lg" type="email" placeholder="Enter Email" onChange={(e) => setEmail(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control className="shadow-lg" type="password" placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)} />

                    </Form.Group>
                    <Button className="shadow-lg" type="submit" disabled={loading}>{loading ? "Loading..." : "Register"}</Button>

                </Form>
            </div>
        </div>
    );
}

export default Register;