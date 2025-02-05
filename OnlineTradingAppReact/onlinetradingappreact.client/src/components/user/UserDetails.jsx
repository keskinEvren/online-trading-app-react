import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getUser } from '../../services/userService';

// Form bileşenleri için (create/edit)

// Detay bileşenleri için
const UserDetails = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadUser();
    }, [id]);

    const loadUser = async () => {
        try {
            const user = await getUser(id);
            setUser(user.data);
        } catch (error) {
            setError('Error loading user details');
        }
    };

    if (error) {
        return <div className="alert alert-danger">{error}</div>;
    }

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
            <h1>User Details</h1>
            <hr />

            <dl className="row">
                <dt className="col-sm-2">First Name</dt>
                <dd className="col-sm-10">{user.firstName}</dd>

                <dt className="col-sm-2">Last Name</dt>
                <dd className="col-sm-10">{user.lastName}</dd>

                <dt className="col-sm-2">Email</dt>
                <dd className="col-sm-10">{user.email}</dd>
            </dl>

            <div>
                <Link
                    to={`/user/edit/${user.id}`}
                    className="btn btn-warning me-2"
                >
                    Edit
                </Link>
                <Link
                    to="/user"
                    className="btn btn-secondary"
                >
                    Back to List
                </Link>
            </div>
        </div>
    );
};

export default UserDetails;