import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from 'react-toastify';

function Login() {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [loading, setloading] = useState(false);
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        setloading(true);

        const userObj = {
            username,
            password,
        };

        axios
            .post(`${process.env.REACT_APP_BACKEND_URL}/user/login`, userObj)
            .then((res) => {
                if (res.data.status === 200) {
                    localStorage.setItem("token", res.data.data.token);
                    setloading(false)
                    toast.success("Login Successful");
                    setTimeout(() => {
                        navigate("/homepage")

                    }, 560)

                } else {
                    toast.error(res.data.message);
                    setloading(false)
                }
            })
            .catch((err) => {
                toast.error("An error occurred while registering");
                setloading(false)            });
    };

    return (
        <div  className="container-fluid w-100 d-grid flex-column align-content-center justify-content-center" style={{ margin: "50px" }}>
            <div id="card"   className="container w-100 shadow-lg p-3 mb-5 bg-body-tertiary  rounded-3 p-5">
                <h1 className=" text-center" style={{ marginBottom: "20px", fontWeight: "700" }}>Login</h1>
                <ToastContainer position="top-right" autoClose={500} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
                <Form  className="d-flex flex-column align-content-center justify-content-center" onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="username">
                    <Form.Label>Username</Form.Label>
                        <Form.Control className=" shadow-lg"
                        type="text"
                        placeholder="Enter Username"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                        <Form.Control className=" shadow-lg"
                        type="password"
                        placeholder="Enter Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                    <Button className=" shadow-lg" type="submit" disabled={loading}> {loading ? ("Loading...") : ("Login")}</Button>
                </Form>
            </div>
        </div>
    );
}

export default Login;