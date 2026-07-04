import React from "react";
import Link from "next/link";

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-6xl font-bold text-gray-800 mb-4 ">404</h1>
            <h2 className="text-2xl text-gray-600 mb-8">Page Not Found</h2>
            <p className="text-lg text-gray-600 mb-8">
                Sorry, the page you're looking for doesn't exist.
            </p>
            <Link
                href="/"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
            >
                Go Back Home
            </Link>
        </div>
    );
};

export default NotFound;
