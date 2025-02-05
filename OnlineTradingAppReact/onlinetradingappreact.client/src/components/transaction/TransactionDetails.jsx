import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { getTransaction } from '../../services/transactionService';

const TransactionDetails = () => {
    const { id } = useParams();
    const [transaction, setTransaction] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadTransaction();
    }, [id]);

    const loadTransaction = async () => {
        try {
            const transaction = await getTransaction(id);
            setTransaction(transaction.data);
        } catch (error) {
            setError('Error loading transaction details');
        }
    };

    if (error) {
        return <div className="alert alert-danger">{error}</div>;
    }

    if (!transaction) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
            <h1>Transaction Details</h1>
            <hr />

            <dl className="row">

                <dt className="col-sm-2">Transaction Date</dt>
                <dd className="col-sm-10">
                    {new Date(transaction.date).toLocaleString()}
                </dd>

                <dt className="col-sm-2">User</dt>
                <dd className="col-sm-10">
                    <Link to={`/user/${transaction.user.id}`}>
                        {transaction.user.email}
                    </Link>
                </dd>

                <dt className="col-sm-2">Share</dt>
                <dd className="col-sm-10">
                    <Link to={`/share/${transaction.share.id}`}>
                        {transaction.share.symbol}
                    </Link>
                </dd>
                
                <dt className="col-sm-2">Quantity</dt>
                <dd className="col-sm-10">{transaction.quantity}</dd>

                <dt className="col-sm-2">Share Price</dt>
                <dd className="col-sm-10">
                    ${transaction.share.price}
                </dd>

                <dt className="col-sm-2">Total Value</dt>
                <dd className="col-sm-10">
                    ${transaction.quantity * transaction.share.price}
                </dd>
            </dl>

            <div>
                <Link to="/transaction" className="btn btn-secondary">Back to List</Link>
            </div>
        </div>
    );
};

export default TransactionDetails;