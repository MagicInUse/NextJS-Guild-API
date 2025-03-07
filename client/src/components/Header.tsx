import React from 'react';
import Link from 'next/link';

// Header component that renders the navigation bar
const Header: React.FC = () => {
    return (
        <header className="font-metamorphous nav-banner">
            {/* Title of the website */}
            <h1 className="wow-title">&lt;Faded Legends&gt;</h1>
            {/* Navigation links */}
            <nav className="flex justify-center space-x-8 mt-4">
                <Link href="/" className="nav-button text-xl hover:text-[#FF8000] transition-colors">Home</Link>
                <Link href="/roster" className="nav-button text-xl hover:text-[#FF8000] transition-colors">Roster</Link>
            </nav>
        </header>
    );
};

export default Header;