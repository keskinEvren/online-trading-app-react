import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createUser } from '../../services/userService';

const UserCreate = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: ''
    });
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createUser(user);
            navigate('/user');
        } catch (error) {
            setError(error.response?.data || 'Error creating user');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="container">
            <h1>Create User</h1>
            <hr />

            {error && (
                <div className="alert alert-danger">
                    {error}
                </div>
            )}

            <div className="row">
                <div className="col-md-4">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group mb-3">
                            <label className="control-label">First Name</label>
                            <input
                                name="firstName"
                                type="text"
                                className="form-control"
                                value={user.firstName}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group mb-3">
                            <label className="control-label">Last Name</label>
                            <input
                                name="lastName"
                                type="text"
                                className="form-control"
                                value={user.lastName}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group mb-3">
                            <label className="control-label">Email</label>
                            <input
                                name="email"
                                type="text"
                                // type="email"
                                className="form-control"
                                value={user.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group mb-3">
                            <button type="submit" className="btn btn-primary">Create</button>
                        </div>
                    </form>
                </div>
            </div>

            <div>
                <Link to="/user" className="btn btn-secondary">Back to List</Link>
            </div>
        </div>
    );
};

export default UserCreate;