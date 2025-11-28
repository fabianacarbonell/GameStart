import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Heart, ShoppingCart } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar: React.FC = () => {
    const { isAuthenticated, user, logout } = useAuth();
    const { cartCount } = useCart();

    return (
        <div className="bg-base-100 border-b border-gray-800">
            {/* Top Navigation Bar */}
            <div className="navbar px-4 md:px-8 py-2">
                <div className="flex-1">
                    <Link to="/" className="text-2xl font-bold text-white tracking-tight">
                        GameStart
                    </Link>
                </div>

                <div className="flex-none gap-2 hidden md:flex flex-1 max-w-xl mx-8">
                    <div className="join w-full">
                        <input
                            type="text"
                            placeholder="Search games..."
                            className="input input-bordered input-sm w-full join-item bg-gray-800 text-white border-gray-700 focus:outline-none focus:border-primary"
                        />
                        <select className="select select-bordered select-sm join-item bg-gray-800 text-gray-400 border-gray-700 focus:outline-none min-w-[120px]">
                            <option>All categories</option>
                            <option>PC</option>
                            <option>PS5</option>
                            <option>Xbox</option>
                        </select>
                        <button className="btn btn-sm join-item bg-gray-700 border-gray-700 hover:bg-gray-600 text-white">
                            <Search size={16} />
                        </button>
                    </div>
                </div>

                <div className="flex-none gap-3">
                    <Link to="/sell" className="btn btn-sm bg-yellow-400 hover:bg-yellow-500 border-none rounded-full px-6 normal-case font-semibold text-black shadow-lg hover:shadow-yellow-400/50">
                        Sell Games
                    </Link>

                    {!isAuthenticated && (
                        <>
                            <Link to="/register" className="btn btn-sm btn-outline border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black rounded-full px-6 normal-case font-semibold">
                                Sign Up
                            </Link>
                            <Link to="/login" className="btn btn-sm btn-outline rounded-full px-6 normal-case text-white border-gray-600 hover:bg-gray-800 hover:border-gray-500">
                                Sign In
                            </Link>
                        </>
                    )}

                    <button className="btn btn-ghost btn-circle btn-sm hover:bg-gray-800">
                        <Heart size={20} className="text-white" />
                    </button>

                    <Link to="/cart" className="btn btn-ghost btn-circle btn-sm hover:bg-gray-800">
                        <div className="indicator">
                            <ShoppingCart size={20} className="text-white" />
                            {cartCount > 0 && (
                                <span className="badge badge-sm indicator-item badge-primary text-black font-bold">{cartCount}</span>
                            )}
                        </div>
                    </Link>

                    {isAuthenticated && (
                        <div className="dropdown dropdown-end">
                            <label tabIndex={0} className="btn btn-sm bg-yellow-400 hover:bg-yellow-500 rounded-full px-6 normal-case font-semibold text-black">
                                {user?.username}
                            </label>
                            <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52 border border-gray-700">
                                <li><Link to="/dashboard">Dashboard</Link></li>
                                <li><Link to="/dashboard">My Listings</Link></li>
                                <li><button onClick={logout}>Logout</button></li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>

            {/* Category Navigation Tabs */}
            <div className="flex items-center justify-center gap-8 px-4 py-3 text-sm border-t border-gray-800">
                <Link to="/browse?category=all" className="text-gray-400 hover:text-white transition-colors">
                    All Games
                </Link>
                <Link to="/browse?category=pc" className="text-gray-400 hover:text-white transition-colors">
                    PC Games
                </Link>
                <Link to="/browse?category=playstation" className="text-gray-400 hover:text-white transition-colors">
                    PlayStation
                </Link>
                <Link to="/browse?category=xbox" className="text-gray-400 hover:text-white transition-colors">
                    Xbox
                </Link>
                <Link to="/browse?category=nintendo" className="text-gray-400 hover:text-white transition-colors">
                    Nintendo Switch
                </Link>
            </div>
        </div>
    );
};

export default Navbar;
