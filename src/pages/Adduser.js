import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import FileBase from 'react-file-base64';

const Adduser = () => {
    let history = useHistory();

    const [users, setUsers] = useState({
        name: "",
        username: "",
        email: "",
        phone: "",
        location: "",
        website: "",
        selectedFile: ""
    })

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
        method: 'post',
        url: 'http://localhost:8080/users',
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


    return (
        <div className="container">
            <div className="w-75 mx-auto shadow p-5">
                <h2 className="text-center mb-4">Add A User</h2>
                <form onSubmit={e => onSubmit(e)}>
                    <div className="form-group">
                        <input type="text" className="form-control form-control-lg" placeholder="Enter Your Name" name="name" value={users.name} onChange={(e) => setUsers({ ...users, name: e.target.value })} />
                    </div>
                    <div className="form-group mr-2">
                        <input type="text" className="form-control form-control-lg" placeholder="Enter Your username" name="username" value={users.username} onChange={(e) => setUsers({ ...users, username: e.target.value })} />
                    </div>
                    <div className="form-group mr-2">
                        <input type="text" className="form-control form-control-lg" placeholder="Enter Your E-main Address" name="email" value={users.email} onChange={(e) => setUsers({ ...users, email: e.target.value })} />
                    </div>
                    <div className="form-group mr-2">
                        <input type="text" className="form-control form-control-lg" placeholder="Enter Your Phone Number" name="phone" value={users.phone} onChange={(e) => setUsers({ ...users, phone: e.target.value })} />
                    </div>
                    <div className="form-group mr-2">
                        <input type="text" className="form-control form-control-lg" placeholder="Enter Your Location" name="location" value={users.location} onChange={(e) => setUsers({ ...users, location: e.target.value })} />
                    </div>
                    <div className="form-group mr-2">
                        <input type="text" className="form-control form-control-lg" placeholder="Enter Your Website Name" name="website" value={users.website} onChange={(e) => setUsers({ ...users, website: e.target.value })} />
                    </div>
                    <div className="form-group mr-2">
                        <FileBase type="image" multiple={false} onDone={({ base64 }) => setUsers({ ...users, selectedFile: base64 })} />
                    </div>
                    <button className="btn btn-primary btn-block">Add User</button>
                </form>
            </div>
        </div>
    );
};

export default Adduser;
