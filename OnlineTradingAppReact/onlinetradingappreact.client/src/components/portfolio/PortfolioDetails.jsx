import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getPortfolio } from '../../services/portfolioService';

const PortfolioDetails = () => {
    const { id } = useParams();
    const [portfolio, setPortfolio] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadPortfolio();
    }, [id]);

    const loadPortfolio = async () => {
        try {
            const portfolio = await getPortfolio(id);
            setPortfolio(portfolio.data);
        } catch (error) {
            setError('Error loading portfolio details');
        }
    };

    if (error) {
        return <div className="alert alert-danger">{error}</div>;
    }

    if (!portfolio) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
            <h1>Details</h1>

            <div>
                <h4>Portfolio</h4>
                <hr />
                <dl className="row">
                    <dt className="col-sm-2">Balance</dt>
                    <dd className="col-sm-10">{portfolio.balance}</dd>

                    <dt className="col-sm-2">User</dt>
                    <dd className="col-sm-10">
                        <Link to={`/user/${portfolio.user.id}`}>
                            {portfolio.user.email}
                        </Link>
                    </dd>
                </dl>
            </div>

            <div>
                <Link
                    to={`/portfolio/edit/${portfolio.id}`}
                    className="btn btn-warning me-2"
                >
                    Edit
                </Link>
                <Link
                    to="/portfolio"
                    className="btn btn-secondary"
                >
                    Back to List
                </Link>
            </div>
        </div>
    );
};

export default PortfolioDetails;