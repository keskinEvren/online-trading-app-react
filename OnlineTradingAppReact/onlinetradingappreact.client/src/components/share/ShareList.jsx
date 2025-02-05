import React, {useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {getShares} from '../../services/shareService';
import {getPortfolios} from "@/services/portfolioService.js";
import * as shareService from "@/services/shareService.js";


const ShareList = () => {
    const [shares, setShares] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        loadShares();
    }, []);

    const loadShares = async () => {
        try {
            const shares = await getShares();
            setShares(shares.data);
        } catch (error) {
            console.error('Error loading portfolios:', error);
        }
    };

    const filteredShares = shares.filter(share =>
        share.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
        share.price.toString().includes(searchTerm) ||
        share.quantity.toString().includes(searchTerm)
    );

    const deleteShare = async (id) => {
        try {
            await shareService.deleteShare(id);
            setShares((prevShares) => prevShares.filter((share) => share.id !== id));
        } catch (error) {
            console.error('Error loading portfolios:', error);
        }
    };


    return (
        <div className="container">
            <h1>Shares</h1>
            <Link to="/share/create" className="btn btn-primary mb-3">Create New</Link>

            <input
                type="text"
                className="form-control mb-3"
                placeholder="Search by Symbol, Price, or Quantity"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            <table className="table table-striped">
                <thead>
                <tr>
                    <th>Symbol</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total Volume</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {filteredShares.map(share => (
                    <tr key={share.id}>
                        <td>{share.symbol}</td>
                        <td>${share.price}</td>
                        <td>{share.quantity}</td>
                        <td>${share.price * share.quantity}</td>
                        <td>
                            <Link to={`/share/edit/${share.id}`} className="btn btn-warning me-2">Edit</Link>
                            <Link to={`/share/${share.id}`} className="btn btn-info me-2">Details</Link>
                            <Link onClick={(e) => {
                                e.preventDefault(); // Prevent navigation
                                deleteShare(share.id);
                            }}
                                  to={`/share`} className="btn btn-danger">Delete</Link>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default ShareList;