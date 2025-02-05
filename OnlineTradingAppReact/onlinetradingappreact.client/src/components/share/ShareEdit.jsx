import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {getUser} from "@/services/userService.js";
import {getShare, getShares, updateShare} from "@/services/shareService.js";
import {updatePortfolio} from "@/services/portfolioService.js";

// Additional imports go here


const ShareEdit = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [share, setShare] = useState({
        id: '',
        symbol: '',
        price: 0,
        quantity: 0
    });
    const [error, setError] = useState(null);

    useEffect(() => {
        loadShare();
    }, [id]);


    const loadShare = async () => {
        try {
            const share = await getShare(id);
            setShare(share.data);
        } catch (error) {
            setError('Error loading user');
        }
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateShare(id, share);
            navigate('/share');
        } catch (error) {
            setError(error.response?.data || 'Error updating portfolio');
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
            <h1>Edit Share</h1>
            <hr />

            {error && (
                <div className="alert alert-danger">
                    {error}
                </div>
            )}

            <div className="row">
                <div className="col-md-4">
                    <form onSubmit={handleSubmit}>
                        <input type="hidden" name="shareId" value={share.shareId} />

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
                            <button type="submit" className="btn btn-primary">Save</button>
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

export default ShareEdit;