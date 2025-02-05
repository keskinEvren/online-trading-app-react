import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import {getPortfolio} from "@/services/portfolioService.js";
import {getShare} from "@/services/shareService.js";

// Any other imports

const ShareDetails = () => {
    const { id } = useParams();
    const [share, setShare] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadShare();
    }, [id]);


    const loadShare = async () => {
        try {
            const share = await getShare(id);
            setShare(share.data);
        } catch (error) {
            setError('Error loading portfolio details');
        }
    };


    if (error) {
        return <div className="alert alert-danger">{error}</div>;
    }

    if (!share) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
            <h1>Share Details</h1>
            <hr />

            <dl className="row">
                <dt className="col-sm-2">Symbol</dt>
                <dd className="col-sm-10">{share.symbol}</dd>

                <dt className="col-sm-2">Price</dt>
                <dd className="col-sm-10">${share.price}</dd>

                <dt className="col-sm-2">Quantity</dt>
                <dd className="col-sm-10">{share.quantity}</dd>

                <dt className="col-sm-2">Total Volume</dt>
                <dd className="col-sm-10">${share.price * share.quantity}</dd>
            </dl>

            <div>
                <Link
                    to={`/share/edit/${share.id}`}
                    className="btn btn-warning me-2"
                >
                    Edit
                </Link>
                <Link
                    to="/share"
                    className="btn btn-secondary"
                >
                    Back to List
                </Link>
            </div>
        </div>
    );
};

export default ShareDetails;