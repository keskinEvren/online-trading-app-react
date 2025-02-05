import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { buyShare } from '../../services/transactionService';
import { getUsers } from '../../services/userService';
import { getShares } from '../../services/shareService';

const BuyShare = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [shares, setShares] = useState([]);
    const [transaction, setTransaction] = useState({
        userId: '',
        shareId: '',
        quantity: 0
    });
    const [error, setError] = useState(null);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const [users, shares] = await Promise.all([
                getUsers(),
                getShares()
            ]);
            setUsers(users.data);
            setShares(shares.data);
        } catch (error) {
            setError('Error loading data');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await buyShare(transaction);
            navigate('/transaction');
        } catch (error) {
            setError(error.response.data.message || 'Error processing buy transaction');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTransaction(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="container">
            <h1>Buy Share</h1>
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
                                value={transaction.userId}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select User</option>
                                {users.map(user => (
                                    <option key={user.id} value={user.id}>
                                        {user.email}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group mb-3">
                            <label className="control-label">Share</label>
                            <select
                                name="shareId"
                                className="form-control"
                                value={transaction.id}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select Share</option>
                                {shares.map(share => (
                                    <option key={share.id} value={share.id}>
                                        {share.symbol} - ${share.price}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group mb-3">
                            <label className="control-label">Quantity</label>
                            <input
                                name="quantity"
                                type="number"
                                className="form-control"
                                value={transaction.quantity}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group mb-3">
                            <button type="submit" className="btn btn-primary">Buy</button>
                        </div>
                    </form>
                </div>
            </div>

            <div>
                <Link to="/transaction" className="btn btn-secondary">Back to List</Link>
            </div>
        </div>
    );
};

export default BuyShare;