import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { getUser, updateUser } from '../../services/userService';

// Form bileşenleri için (create/edit)

// Detay bileşenleri için
const UserEdit = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [user, setUser] = useState({
        userId: '',
        userFirstName: '',
        userLastName: '',
        userEmail: ''
    });
    const [error, setError] = useState(null);

    useEffect(() => {
        loadUser();
    }, [id]);

    const loadUser = async () => {
        try {
            const data = await getUser(id);
            setUser(data);
        } catch (error) {
            setError('Error loading user');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateUser(id, user);
            navigate('/user');
        } catch (error) {
            setError(error.response?.data || 'Error updating user');
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
            <h1>Edit User</h1>
            <hr />

            {error && (
                <div className="alert alert-danger">
                    {error}
                </div>
            )}

            <div className="row">
                <div className="col-md-4">
                    <form onSubmit={handleSubmit}>
                        <input type="hidden" name="userId" value={user.userId} />

                        <div className="form-group mb-3">
                            <label className="control-label">First Name</label>
                            <input
                                name="userFirstName"
                                type="text"
                                className="form-control"
                                value={user.userFirstName}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group mb-3">
                            <label className="control-label">Last Name</label>
                            <input
                                name="userLastName"
                                type="text"
                                className="form-control"
                                value={user.userLastName}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group mb-3">
                            <label className="control-label">Email</label>
                            <input
                                name="userEmail"
                                type="email"
                                className="form-control"
                                value={user.userEmail}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group mb-3">
                            <button type="submit" className="btn btn-primary">Save</button>
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

export default UserEdit;