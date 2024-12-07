import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <Link to="/analysis/smallsql">
                    <button style={{ padding: '20px', fontSize: '20px' }}>View smallsql analysis</button>
                </Link>
                <Link to="/analysis/hsqldb-2.3.1">
                    <button style={{ padding: '20px', fontSize: '20px' }}>View hsqldb-2.3.1 analysis</button>
                </Link>
                <Link to="/analysis/test">
                    <button style={{ padding: '20px', fontSize: '20px' }}>View test analysis</button>
                </Link>
            </div>
        </div>
    );
};

export default Home;