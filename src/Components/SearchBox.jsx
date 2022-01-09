import { Button, Modal } from 'react-bootstrap';
import React, { useState } from 'react'
import JSONDATA from "../db.json";
import "./SearchBox.css";

export const SearchBox = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [showModal, setShow] = useState(false);
    const [data, setData] = useState("");
    
    const handleClose = (e) => {
        setShow(false);
        setSearchTerm("");
    }
    const handleShow = (e) => {
        setShow(true);
        setData(e.target.innerHTML);
        // console.log(data);
        // console.log(e.target);
    }

    function handleCancel(e) {
        setSearchTerm("");
    }

    return (
        <>
            <div className='search-cont'>
                <div className="search-area">
                    <input
                        className='search-inp'
                        value={searchTerm}
                        type="text"
                        placeholder="Search Country..."
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                        }}
                    />
                    <img
                        className='x-btn'
                        src="x-lg.svg"
                        alt="x"
                        onClick={handleCancel}
                    />
                </div>
            </div>
            <div className='data-cont'>
                {JSONDATA.filter((val) => {
                    if (searchTerm === "") {
                        return "";
                    } else if (val.country.toLowerCase().includes(searchTerm.toLowerCase())) {
                        return val;
                    }
                }).map((val, key) => {
                    return (
                        <div className='country' key={key} onClick={handleShow}>
                            <p>{val.country}</p>
                        </div>
                    );
                })}
            </div>
            <div>
            {JSONDATA.filter((val) => {
                let result = <p>{val.country}</p>
                    // console.log(result.props.children);
                    if (result.props.children === data) {
                        return val;
                    }
                }).map((val) => {
                    return (
                        <Modal show={showModal} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Country: {val.country} </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Capital: {val.city} </Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" onClick={handleClose}>
                                Search Another
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    );
                })}
                
            </div>
        </>
    )
}
