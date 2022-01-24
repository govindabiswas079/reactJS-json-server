import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import FileBase from 'react-file-base64';

const Edituser = () => {
    let history = useHistory();
    const { id } = useParams();

    const [users, setUsers] = useState({
        name: "",
        username: "",
        email: "",
        phone: "",
        location: "",
        website: "",
        selectedFile: ""
    });

    var data = JSON.stringify({
        users: {
            name: users.name,
            username: users.username,
            email: users.email,
            phone: users.phone,
            location: users.location,
            website: users.website,
            selectedFile: users.selectedFile
        }
    })

    var config = {
        method: 'put',
        url: `http://localhost:8080/users/${id}`,
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    }

    const onSubmit = async e => {
        e.preventDefault();

        await axios(config)
            .then(function (response) {
                // console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });
        history.push('/');
    }


    var getconfig = {
        method: 'get',
        url: `http://localhost:8080/users/${id}`,
        headers: {
            'Content-Type': 'application/json'
        },
    }

    const loadUsers = async () => {
        await axios(getconfig)
            .then(function (response) {
                const data = response.data
                setUsers(data.users);

            })
            .catch(function (error) {
                console.log(error);
            });
    };


    useEffect(() => {
        loadUsers();
        // eslint-disable-next-line
    }, []);

    return (
        <div className="container">
            <div className="w-75 mx-auto shadow p-5">
                <h2 className="text-center mb-4">Edit User</h2>
                <form onSubmit={e => onSubmit(e)}>
                    <div className="form-group">
                        <input type="text" className="form-control form-control-lg" required placeholder="Enter Your Name" name="name" value={users.name} onChange={(e) => setUsers({ ...users, name: e.target.value })} />
                    </div>
                    <div className="form-group mr-2">
                        <input type="text" className="form-control form-control-lg" required placeholder="Enter Your username" name="username" value={users.username} onChange={(e) => setUsers({ ...users, username: e.target.value })} />
                    </div>
                    <div className="form-group mr-2">
                        <input type="text" className="form-control form-control-lg" required placeholder="Enter Your E-main Address" name="email" value={users.email} onChange={(e) => setUsers({ ...users, email: e.target.value })} />
                    </div>
                    <div className="form-group mr-2">
                        <input type="text" className="form-control form-control-lg" required placeholder="Enter Your Phone Number" name="phone" value={users.phone} onChange={(e) => setUsers({ ...users, phone: e.target.value })} />
                    </div>
                    <div className="form-group mr-2">
                        <input type="text" className="form-control form-control-lg" required placeholder="Enter Your Location" name="location" value={users.location} onChange={(e) => setUsers({ ...users, location: e.target.value })} />
                    </div>
                    <div className="form-group mr-2">
                        <input type="text" className="form-control form-control-lg" required placeholder="Enter Your Website Name" name="website" value={users.website} onChange={(e) => setUsers({ ...users, website: e.target.value })} />
                    </div>
                    <div className="form-group mr-2">
                        <FileBase type="file" multiple={false} onDone={({ base64 }) => setUsers({ ...users, selectedFile: base64 })} />
                    </div>
                    <button className="btn btn-warning btn-block">Update User</button>
                </form>
            </div>
        </div>
    );
};

export default Edituser;
