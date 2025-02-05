import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {getTransactions} from '../../services/transactionService';

const TransactionList = () => {
    const [transactions, setTransactions] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        loadTransactions();
    }, []);

    const loadTransactions = async () => {
        try {
            const transactions = await getTransactions();
            setTransactions(transactions.data);
        } catch (error) {
            console.error('Error loading transactions:', error);
        }
    };

    const filteredTransactions = transactions.filter(transaction =>
        transaction.quantity.toString().includes(searchTerm.toLowerCase()) ||
        transaction.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.share.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container">
            <h1>Transactions</h1>
            <div>
                <Link to="/transaction/buy" className="btn btn-primary me-2">Buy Share</Link>
                <Link to="/transaction/sell" className="btn btn-primary">Sell Share</Link>
            </div>

            <input
                type="text"
                className="form-control my-3"
                placeholder="Search by Quantity, User, or Share"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Quantity</th>
                        <th>Share</th>
                        <th>Transaction Date</th>
                        <th>User</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredTransactions.map(transaction => (
                        <tr key={transaction.id}>
                            <td>{transaction.quantity}</td>
                            <td>{transaction.share.symbol}</td>
                            <td>{new Date(transaction.date).toLocaleString()}</td>
                            <td>{transaction.user.email}</td>
                            <td>
                                <Link
                                    to={`/transaction/${transaction.id}`}
                                    className="btn btn-info"
                                >
                                    Details
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TransactionList;