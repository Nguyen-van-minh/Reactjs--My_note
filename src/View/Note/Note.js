import { useState, useEffect } from "react";
import { Container, Row, Col } from 'reactstrap';
import { Button, Input } from 'reactstrap';
import './Note.scss';

function Note() {

    const [image, setImage] = useState('')
    const [content, setContent] = useState('')
    const [images, setImages] = useState([])

    const [edit, setEdit] = useState(null);
    const [editImage, setEditImage] = useState('')
    const [editContent, setEditContent] = useState('')

    useEffect(() => {
        const json = localStorage.getItem("images");
        const loadedImages = JSON.parse(json);
        if (loadedImages) {
            setImages(loadedImages);
        }
    }, []);

    useEffect(() => {
        const json = JSON.stringify(images);
        localStorage.setItem("images", json);
    }, [images]);


    const add = () => {
        if (!image) {
            alert("Hãy nhập đủ nội dung");
        } else {
            const newImages = {
                id: Math.round(1 + Math.random() * (1000 - 1)),
                url: image,
                content: content
            };
            setImages([...images].concat(newImages));
            setImage("");
            setContent("");
        }
    };

    const deleteImage = (id) => {
        let update = [...images].filter((i) => i.id !== id);
        setImages(update);
    }

    const submitEdits = (id) => {
        const updated = [...images].map((item) => {
            if (item.id === id) {
                item.url = image;
                item.content = content;
            }
            return item;
        });
        setImages(updated);
        setImage("");
        setContent("");
        setEdit(null);
    }

    const select = (id) => {
        setEdit(id)
        images.map((item) => {
            if (item.id === id) {
                setContent(item.content)
                setImage(item.url)
            }
            // return;
        })

    }

    return (
        <div>

            <div className="table">
                {edit ? <h2>Editing</h2> : <h2>Note images</h2>}
                <Container>
                    <Row>
                        <Col sm="12" md={{ size: 8, offset: 2 }}>
                            <div className="input">
                                <Input onChange={(e) => setImage(e.target.value)} value={image} type="text" placeholder="Input URL image" />
                                <Input onChange={(e) => setContent(e.target.value)} value={content} type="text" placeholder="Input content for image" />
                                {
                                    edit ? <Button color="warning" onClick={() => { submitEdits(edit) }}> Submit </Button> :
                                        <Button color="primary" onClick={add}> Add</Button>
                                }

                            </div>
                        </Col>
                    </Row>
                    <Row>
                        {
                            images.map((item, index) => (
                                <Col key={item.id} xs="6" sm="6" md="4">
                                    <div className="border-image">
                                        <img className="images" src={item.url} />
                                        <div>{item.content}</div>
                                        <div style={{ margin: 10 }}>
                                            <Button style={{ marginRight: 10 }} color="danger" onClick={() => { deleteImage(item.id) }}>Delete</Button>
                                            {
                                                edit ? null : <Button onClick={() => { select(item.id) }} color="warning">Edit</Button>
                                            }

                                        </div>

                                    </div>
                                </Col>
                            ))
                        }
                    </Row>
                </Container>
            </div>
        </div>
    )
}

export default Note