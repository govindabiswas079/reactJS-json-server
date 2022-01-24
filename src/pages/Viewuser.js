import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import './Viewuser.css';

const Viewuser = () => {

    const [user, setUser] = useState({})
    console.log(user)
    const { id } = useParams();

    var config = {
        method: 'get',
        url: `http://localhost:8080/users/${id}`,
        headers: {
            'Content-Type': 'application/json'
        },
    }

    const loadUser = async () => {
        await axios(config)
            .then(function (response) {
                const data = response.data
                setUser(data.users);

            })
            .catch(function (error) {
                console.log(error);
            });
    };

    useEffect(() => {
        loadUser();
        // eslint-disable-next-line
    }, []);

    return (
        <div className="container py-4">
            <Link className="btn btn-primary" to="/">
                back to home
            </Link>
            <h1 className="display-4">User Id: {id}</h1>
            <hr />
            <ul className="list-group w-50">
                <li className="list-group-item">Name: {user.name}</li>
                <li className="list-group-item">User Name: {user.username}</li>
                <li className="list-group-item">Email: {user.email}</li>
                <li className="list-group-item">Phone: {user.phone}</li>
                <li className="list-group-item">Location: {user.location}</li>
                <li className="list-group-item">Website: {user.website}</li>
                <label>Image:</label>
                <div className="img">
                    <img className="image" src={user.selectedFile} alt="" />
                </div>
            </ul>
        </div>
    );
};

export default Viewuser;
