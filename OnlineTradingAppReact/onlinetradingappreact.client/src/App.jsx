import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';

// Portfolio components
import PortfolioList from './components/portfolio/PortfolioList';
import PortfolioCreate from './components/portfolio/PortfolioCreate';
import PortfolioEdit from './components/portfolio/PortfolioEdit';
import PortfolioDetails from './components/portfolio/PortfolioDetails';

// Share components
import ShareList from './components/share/ShareList';
import ShareCreate from './components/share/ShareCreate';
import ShareEdit from './components/share/ShareEdit';
import ShareDetails from './components/share/ShareDetails';

// Transaction components
import TransactionList from './components/transaction/TransactionList';
import BuyShare from './components/transaction/BuyShare';
import SellShare from './components/transaction/SellShare';
import TransactionDetails from './components/transaction/TransactionDetails';

// User components
import UserList from './components/user/UserList';
import UserCreate from './components/user/UserCreate';
import UserEdit from './components/user/UserEdit';
import UserDetails from './components/user/UserDetails';

// Layout component
const Layout = ({ children }) => {
    return (
        <div>
            <Navbar />
            <div className="container mt-4">
                {children}
            </div>
        </div>
    );
};

// Home component
const Home = () => {
    const [users, setUsers] = useState([]);
    const [shares, setShares] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const usersResponse = await fetch('api/user');
            if (usersResponse.ok) {
                const userData = await usersResponse.json();
                setUsers(userData.data);
            }

            const sharesResponse = await fetch('api/share');
            if (sharesResponse.ok) {
                const shareData = await sharesResponse.json();
                setShares(shareData.data);
            }

            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Users</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.userId}>
                            <td>{user.userId}</td>
                            <td>{user.userFirstName}</td>
                            <td>{user.userLastName}</td>
                            <td>{user.userEmail}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h2>Shares</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Symbol</th>
                        <th>Price</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {shares.map(share => (
                        <tr key={share.shareId}>
                            <td>{share.symbol}</td>
                            <td>${share.price}</td>
                            <td>{share.quantity}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

function App() {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />

                    {/* Portfolio routes */}
                    <Route path="/portfolio" element={<PortfolioList />} />
                    <Route path="/portfolio/create" element={<PortfolioCreate />} />
                    <Route path="/portfolio/edit/:id" element={<PortfolioEdit />} />
                    <Route path="/portfolio/:id" element={<PortfolioDetails />} />

                    {/* Share routes */}
                    <Route path="/share" element={<ShareList />} />
                    <Route path="/share/create" element={<ShareCreate />} />
                    <Route path="/share/edit/:id" element={<ShareEdit />} />
                    <Route path="/share/:id" element={<ShareDetails />} />

                    {/* Transaction routes */}
                    <Route path="/transaction" element={<TransactionList />} />
                    <Route path="/transaction/buy" element={<BuyShare />} />
                    <Route path="/transaction/sell" element={<SellShare />} />
                    <Route path="/transaction/:id" element={<TransactionDetails />} />

                    {/* User routes */}
                    <Route path="/user" element={<UserList />} />
                    <Route path="/user/create" element={<UserCreate />} />
                    <Route path="/user/edit/:id" element={<UserEdit />} />
                    <Route path="/user/:id" element={<UserDetails />} />
                </Routes>
            </Layout>
        </Router>
    );
}

export default App;