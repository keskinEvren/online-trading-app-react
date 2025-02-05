import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPortfolio } from '../../services/portfolioService';
import { getUsers } from '../../services/userService';

const PortfolioCreate = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [portfolio, setPortfolio] = useState({
        userId: '',
        balance: 0
    });
    const [error, setError] = useState(null);

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        try {
            const data = await getUsers();
            setUsers(data);
        } catch (error) {
            setError('Error loading users');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createPortfolio(portfolio);
            navigate('/portfolio');
        } catch (error) {
            setError(error.response?.data || 'Error creating portfolio');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPortfolio(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="container">
            <h1>Create</h1>
            <h4>Portfolio</h4>
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
                            <label className="control-label">User</label>
                            <select
                                name="userId"
                                className="form-control"
                                value={portfolio.userId}
                                onChange={handleChange}
                            >
                                <option value="">Select User</option>
                                {users.map(user => (
                                    <option key={user.userId} value={user.userId}>
                                        {user.userEmail}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group mb-3">
                            <label className="control-label">Balance</label>
                            <input
                                name="balance"
                                type="number"
                                className="form-control"
                                value={portfolio.balance}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group mb-3">
                            <button type="submit" className="btn btn-primary">Create</button>
                        </div>
                    </form>
                </div>
            </div>

            <div>
                <a href="/portfolio" className="btn btn-secondary">Back to List</a>
            </div>
        </div>
    );
};

export default PortfolioCreate;