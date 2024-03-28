import axios from "axios";
import { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function BlogCard({ blogData, homepage }) {
    const [isEdit, setIsEdit] = useState(false);
    const [newTitle, setNewTitle] = useState("");
    const [newTextBody, setNewTextBody] = useState("");

    const token = localStorage.getItem("token");

    const ConfirmationDialog = ({ closeToast, handleDelete, blogId }) => (
        <div>
            <p>Are You Sure To Delete This Blog...</p>

            <Button
                variant="danger"
                style={{ marginRight: "10px" }}
                onClick={() => {
                    closeToast();
                    handleDelete(blogId);
                }}
            >
                Yes
            </Button>
            <Button
                variant="primary"
                style={{ marginRight: "10px" }} onClick={closeToast}>No</Button>
        </div>
    );

    const handleConfirmation = (blogId) => {
        toast.warn(
            <ConfirmationDialog blogId={blogId} handleDelete={handleDelete} />,
            {
                position: "top-center",
                autoClose: false,
                closeOnClick: false,
                draggable: true,
                closeButton: false,


                progress: undefined,
                theme: "dark",
                transition: "Bounce"






            }
        );
    };
    const handleDelete = (blogId) => {
        axios
            .delete(
                `${process.env.REACT_APP_BACKEND_URL}/blog/delete-blog/${blogId}`,
                {
                    headers: {
                        "X-Acciojob": token,
                    },
                }
            )
            .then((res) => {
                if (res.data.status === 200) {
                    toast.success(res.data.message);
                    window.location.reload();
                } else {
                    toast.error(res.data.message);
                }
            })
            .catch((err) => {
                toast.error(err.message);
            });
    };

    const handleSubmit = (e, blogId) => {
        e.preventDefault();

        const blogObj = {
            blogId,
            title: newTitle,
            textBody: newTextBody,
        };

        axios
            .put(`${process.env.REACT_APP_BACKEND_URL} / blog / edit-blog`, blogObj, {
                headers: {
                    "X-Acciojob": token,
                },
            })
            .then((res) => {
                if (res.data.status === 200) {
                    toast.success(res.data.message);
                    window.location.reload();
                } else {
                    toast.error(res.data.message);
                }
            })
            .catch((err) => {
                toast.error(err.message);
            });
    };

    return (
        <Card style={{ margin: "2rem" }}>
            <Card.Body>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <Card.Title>{blogData.title}</Card.Title>
                    <Card.Text>{blogData.creationDateTime}</Card.Text>
                </div>
                <Card.Text>{blogData.textBody}</Card.Text>

                {homepage ? (
                    <>
                        <h6>Created By - {blogData.username}</h6>
                    </>
                ) : (
                    <>
                        <Button
                            variant="primary"
                            style={{ marginRight: "10px" }}
                            onClick={() => setIsEdit(!isEdit)}
                        >
                            Edit
                        </Button>
                        <Button
                            variant="danger"
                            onClick={() => handleConfirmation(blogData._id)}
                        >
                            Delete
                        </Button>
                    </>
                )}

                {isEdit ? (
                    <>
                        <Form
                            onSubmit={(e) => handleSubmit(e, blogData._id)}
                            style={{ marginTop: "2rem" }}
                        >
                            <Form.Group className="mb-3" controlId="title">
                                <Form.Label>Title</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Title"
                                    value={newTitle}
                                    onChange={(e) => setNewTitle(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="textbody">
                                <Form.Label>Text Body</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={5}
                                    placeholder="Enter TextBody"
                                    value={newTextBody}
                                    onChange={(e) => setNewTextBody(e.target.value)}
                                />
                            </Form.Group>
                            <Button type="submit">Edit</Button>
                        </Form>
                    </>
                ) : null}
            </Card.Body>
        </Card>
    );
}

export default BlogCard;