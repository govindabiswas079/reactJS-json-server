import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Container } from '@material-ui/core';
import ReactHtmlTableToExcel from 'react-html-to-excel';
import './Home.css';



const Home = () => {
    const [users, setUsers] = useState([]);
    
    var config = {
        method: 'get',
        url: 'http://localhost:8080/users',
        headers: {
            'Content-Type': 'application/json'
        },
    }

    const loadUsers = async () => {
        await axios(config)
            .then(function (response) {
                const data = response.data
                setUsers(data.reverse());

            })
            .catch(function (error) {
                console.log(error);
            });
    };

    useEffect(() => {
        loadUsers();
        // eslint-disable-next-line
    }, []);


    const deleteUsers = async id => {
        await axios.delete(`http://localhost:8080/users/${id}`);
        loadUsers();
    };

    /* // Array To Object convert
    const product = [{ id: 52, title: "cake", price: "10", category: "cakes" }, { id: 53, title: "new cake", price: "100", category: "new cakes" }]
    const newproduct = Object.assign({}, ...product);
    console.log(newproduct); */

    /* const obj = { 5.0: 10, 28.0: 14, 3.0: 6, 5.0: 10, 28.0: 14, 3.0: 6 };
    const mapped = Object.keys(obj).map(key => ({ type: key, value: obj[key] }));
    console.log(mapped); */

    return (
        <div className="container">
            <div className="py-4">
                <h1>All User's</h1>
                <Container>
                    <table className="table border shadow" id="data-table">
                        <thead className="thead-dark">
                            <tr>
                                <th>Sr.</th>
                                <th>Name</th>
                                <th>User Name</th>
                                <th>Email</th>
                                <th>Image</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr key={index}>
                                    <th>{index + 1}</th>
                                    <td>{user.users.name}</td>
                                    <td>{user.users.username}</td>
                                    <td>{user.users.email}</td>
                                    <td>
                                        <div className="avatar">
                                            <img className="avatar__image" src={user.users.selectedFile} alt="" />
                                        </div>
                                    </td>
                                    <td>
                                        <Link className="btn btn-outline-primary mr-2" to={`/users/${user.id}`}>View</Link>
                                        <Link className="btn btn-outline-primary mr-2" to={`/users/edit/${user.id}`}>Edit</Link>
                                        <Link className="btn btn-outline-primary" onClick={() => deleteUsers(user.id)}>Delete</Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="d-grid gap-2">
                        <ReactHtmlTableToExcel
                            className="btn btn-info"
                            table="data-table"
                            filename="Data Excel File"
                            sheet="Sheet"
                            buttonText="Export to Excel"
                        />
                    </div>
                </Container>
            </div>
        </div>
    );
};

export default Home;