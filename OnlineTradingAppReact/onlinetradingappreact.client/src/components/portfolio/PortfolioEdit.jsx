import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getPortfolio, updatePortfolio } from '../../services/portfolioService';
import { getUsers } from '../../services/userService';

const PortfolioEdit = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [users, setUsers] = useState([]);
    const [portfolio, setPortfolio] = useState({
        id: '',
        userId: '',
        balance: 0
    });
    const [error, setError] = useState(null);

    useEffect(() => {
        loadData();
    }, [id]);

    const loadData = async () => {
        try {
            const [portfolioData, usersData] = await Promise.all([
                getPortfolio(id),
            ]);
            setPortfolio(portfolioData.data);
        } catch (error) {
            setError('Error loading data');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updatePortfolio(id, portfolio);
            navigate('/portfolio');
        } catch (error) {
            setError(error.response?.data || 'Error updating portfolio');
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
            <h1>Edit</h1>
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
                        <input type="hidden" name="id" value={portfolio.id} />

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
                            <button type="submit" className="btn btn-primary">Save</button>
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

export default PortfolioEdit;