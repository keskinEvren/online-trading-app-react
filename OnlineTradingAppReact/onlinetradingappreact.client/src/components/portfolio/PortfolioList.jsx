import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPortfolios } from '../../services/portfolioService';

const PortfolioList = () => {
    const [portfolios, setPortfolios] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        loadPortfolios();
    }, []);

    const loadPortfolios = async () => {
        try {
            const portfolios = await getPortfolios();
            setPortfolios(portfolios.data);
        } catch (error) {
            console.error('Error loading portfolios:', error);
        }
    };

    const filteredPortfolios = portfolios.filter(portfolio =>
        portfolio.balance.toString().includes(searchTerm.toLowerCase()) ||
        portfolio.user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container">
            <h1>Portfolios</h1>
            {/*<Link to="/portfolio/create" className="btn btn-primary mb-3">*/}
            {/*    Create New*/}
            {/*</Link>*/}

            <input
                type="text"
                className="form-control mb-3"
                placeholder="Search by Balance or User"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Balance</th>
                        <th>User</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredPortfolios.map(portfolio => (
                        <tr key={portfolio.id}>
                            <td>{portfolio.balance}</td>
                            <td>
                                <Link to={`/user/${portfolio.user.id}`}>
                                    {portfolio.user.email}
                                </Link>
                            </td>
                            <td>
                                <Link to={`/portfolio/edit/${portfolio.id}`} className="btn btn-warning me-2">
                                    Edit
                                </Link>
                                <Link to={`/portfolio/${portfolio.id}`} className="btn btn-info me-2">
                                    Details
                                </Link>
                                {/*<Link to={`/portfolio/delete/${portfolio.id}`} className="btn btn-danger">*/}
                                {/*    Delete*/}
                                {/*</Link>*/}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PortfolioList;