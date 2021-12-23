import React, { useState, useEffect } from "react";
import { Container, Row, Col } from 'reactstrap';
import { Button, Input } from 'reactstrap';
import './Todo.scss';

function Todo() {
    const [job, setJob] = useState("");
    const [jobs, setJobs] = useState([]);


    useEffect(() => {
        const json = localStorage.getItem("todos");
        const loadedJods = JSON.parse(json);
        if (loadedJods) {
            setJobs(loadedJods);
        }
    }, []);

    useEffect(() => {
        const json = JSON.stringify(jobs);
        localStorage.setItem("todos", json);
    }, [jobs]);

    const add = () => {
        if (!job) {
            alert("khong co du lieu");
        } else {
            const newJob = {
                id: Math.round(1 + Math.random() * (1000 - 1)),
                name: job,
                check: false
            };
            setJobs([...jobs].concat(newJob));
            setJob("");
        }
    };

    const deleteJob = (id) => {
        let update = [...jobs].filter((j) => j.id !== id);
        setJobs(update);
    };

    const check = (id) => {
        const change = [...jobs].filter((job) => {
            if (job.id === id) {
                job.check = !job.check;
            }
            return job;
        });
        setJobs(change);
    };

    return (
        <div className="table">
            <h2>Todo List</h2>
            <Container>
                <Row>
                    <Col sm="12" md={{ size: 8, offset: 2 }}>
                        <div className="input">
                            <Input onChange={(e) => setJob(e.target.value)} value={job} type="text" />
                            <Button color="primary" onClick={add}> Add</Button>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col sm="12" md={{ size: 8, offset: 2 }}>
                        <div className="job">
                            {jobs.map((item) => (

                                <div
                                    className={item.check ? "ok" : "ko"}
                                    key={item.id}
                                >
                                    <span >{item.name}</span>
                                    <div className="button">
                                        {
                                            item.check ? <Button style={{ marginRight: '3px' }} onClick={() => check(item.id)} color="warning">Remake</Button>
                                                : <Button style={{ marginRight: '3px' }} onClick={() => check(item.id)} color="success">Success</Button>
                                        }

                                        <Button color="danger" onClick={() => deleteJob(item.id)}>Delete</Button>
                                    </div>

                                </div>
                            ))}
                        </div>
                    </Col>
                </Row>
            </Container>






        </div>
    );
};

export default Todo;