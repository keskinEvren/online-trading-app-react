import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createShare } from '../../services/shareService';
import {createPortfolio} from "@/services/portfolioService.js";
const ShareCreate = () => {
    const navigate = useNavigate();
    const [share, setShare] = useState({
        symbol: '',
        price: 0,
        quantity: 0
    });
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createShare(share);
            navigate('/share');
        } catch (error) {
            setError(error.response?.data || 'Error creating share');
        }
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        setShare(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="container">
            <h1>Create Share</h1>
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
                            <label className="control-label">Symbol</label>
                            <input
                                name="symbol"
                                type="text"
                                className="form-control"
                                value={share.symbol}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group mb-3">
                            <label className="control-label">Price</label>
                            <input
                                name="price"
                                type="number"
                                step="0.01"
                                className="form-control"
                                value={share.price}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group mb-3">
                            <label className="control-label">Quantity</label>
                            <input
                                name="quantity"
                                type="number"
                                className="form-control"
                                value={share.quantity}
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
                <Link to="/share" className="btn btn-secondary">Back to List</Link>
            </div>
        </div>
    );
};

export default ShareCreate;