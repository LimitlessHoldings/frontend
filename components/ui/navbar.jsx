'use client';

import Link from "next/link";
import { useAuth0 } from "@auth0/auth0-react";

export default function Navbar() {
    const { loginWithRedirect, logout, isAuthenticated } = useAuth0();
    return (
        <nav className="bg-primary-500 text-white p-4">
            <div className="container mx-auto flex items-center justify-between">
                <div className="text-2xl font-bold">LIMITLESS</div>
                    <div className="hidden md:flex space-x-8">
                    <Link href="/" className="hover:text-gray-200">Home</Link>
                    <Link href="/about-us" className="hover:text-gray-200">About Us</Link>
                    <Link href="/projects" className="hover:text-gray-200">Contact Us</Link>
                    {!isAuthenticated && (
                        <button onClick={() => loginWithRedirect()} className="hover:text-gray-200">
                            Login
                        </button>
                    )}
                    {isAuthenticated && (
                        <button onClick={() => logout({ returnTo: 'http://localhost:300/' })} className="hover:text-gray-200">
                            Logout
                        </button>
                    )}
                    </div>
            </div>
        </nav>
    );
}