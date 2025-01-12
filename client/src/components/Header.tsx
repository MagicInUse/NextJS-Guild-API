import React from 'react';
import Link from 'next/link';

const Header: React.FC = () => {
    return (
        <header>
            <h1>Faded Legends Guild</h1>
            <nav>
                <ul>
                    <li>
                        <Link href="/">Home</Link>
                    </li>
                    <li>
                        <Link href="/roster">Guild Roster</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;