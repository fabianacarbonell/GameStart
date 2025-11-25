import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, Edit, Trash2, Plus, User as UserIcon, ShoppingBag } from 'lucide-react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

interface Product {
    id: number;
    name: string;
    price: string;
    discount_price: string | null;
    stock_quantity: number;
    platforms: string;
    condition: string;
    images: { id: number; image: string }[];
    created_at: string;
}

const Dashboard = () => {
    const navigate = useNavigate();
    const { user, isAuthenticated } = useAuth();
    const [myListings, setMyListings] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'listings' | 'profile'>('listings');

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }

        const fetchMyListings = async () => {
            try {
                const response = await api.get('/products/my-listings/');
                setMyListings(response.data);
                setLoading(false);
            } catch (err) {
                console.error('Failed to fetch listings:', err);
                setLoading(false);
            }
        };

        fetchMyListings();
    }, [isAuthenticated, navigate]);

    const handleDeleteListing = async (id: number) => {
        if (!confirm('Are you sure you want to delete this listing?')) return;

        try {
            await api.delete(`/products/${id}/`);
            setMyListings(myListings.filter((product) => product.id !== id));
        } catch (err) {
            alert('Failed to delete listing');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black">
                <div className="loading loading-spinner loading-lg text-yellow-400"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white py-8">
            <div className="container mx-auto px-4 max-w-7xl">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold mb-2">My Dashboard</h1>
                    <p className="text-gray-400">Welcome back, {user?.username}!</p>
                </div>

                {/* Tabs */}
                <div className="flex gap-4 mb-8 border-b border-gray-800">
                    <button
                        onClick={() => setActiveTab('listings')}
                        className={`pb-4 px-4 font-semibold transition-colors relative ${activeTab === 'listings'
                                ? 'text-yellow-400'
                                : 'text-gray-400 hover:text-white'
                            }`}
                    >
                        <Package className="inline mr-2" size={20} />
                        My Listings ({myListings.length})
                        {activeTab === 'listings' && (
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-yellow-400"></div>
                        )}
                    </button>
                    <button
                        onClick={() => setActiveTab('profile')}
                        className={`pb-4 px-4 font-semibold transition-colors relative ${activeTab === 'profile'
                                ? 'text-yellow-400'
                                : 'text-gray-400 hover:text-white'
                            }`}
                    >
                        <UserIcon className="inline mr-2" size={20} />
                        Profile
                        {activeTab === 'profile' && (
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-yellow-400"></div>
                        )}
                    </button>
                </div>

                {/* Content */}
                {activeTab === 'listings' && (
                    <div>
                        {/* Add New Listing Button */}
                        <div className="mb-6">
                            <button
                                onClick={() => navigate('/sell')}
                                className="btn bg-yellow-400 hover:bg-yellow-500 text-black font-bold"
                            >
                                <Plus size={20} />
                                Create New Listing
                            </button>
                        </div>

                        {/* Listings Grid */}
                        {myListings.length === 0 ? (
                            <div className="text-center py-16 bg-gray-900 rounded-lg">
                                <ShoppingBag size={64} className="mx-auto text-gray-600 mb-4" />
                                <h3 className="text-2xl font-bold mb-2">No Listings Yet</h3>
                                <p className="text-gray-400 mb-6">
                                    Start selling by creating your first listing
                                </p>
                                <button
                                    onClick={() => navigate('/sell')}
                                    className="btn bg-yellow-400 hover:bg-yellow-500 text-black font-bold"
                                >
                                    Create Listing
                                </button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {myListings.map((product) => {
                                    const currentPrice = product.discount_price
                                        ? parseFloat(product.discount_price)
                                        : parseFloat(product.price);

                                    return (
                                        <div
                                            key={product.id}
                                            className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800 hover:border-gray-700 transition-all"
                                        >
                                            {/* Image */}
                                            <div className="relative aspect-video bg-gray-800">
                                                <img
                                                    src={product.images[0]?.image || '/placeholder-game.jpg'}
                                                    alt={product.name}
                                                    className="w-full h-full object-cover"
                                                />
                                                <div className="absolute top-2 left-2 bg-blue-600 text-white px-2 py-1 rounded text-xs font-semibold">
                                                    {product.platforms}
                                                </div>
                                                {product.stock_quantity === 0 && (
                                                    <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                                                        <span className="text-red-500 font-bold text-lg">
                                                            OUT OF STOCK
                                                        </span>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Content */}
                                            <div className="p-4">
                                                <h3 className="font-bold text-lg mb-2 line-clamp-1">
                                                    {product.name}
                                                </h3>
                                                <div className="flex items-baseline gap-2 mb-3">
                                                    <span className="text-2xl font-black text-yellow-400">
                                                        €{currentPrice.toFixed(2)}
                                                    </span>
                                                    {product.discount_price && (
                                                        <span className="text-sm text-gray-500 line-through">
                                                            €{parseFloat(product.price).toFixed(2)}
                                                        </span>
                                                    )}
                                                </div>

                                                <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                                                    <span>{product.condition}</span>
                                                    <span>Stock: {product.stock_quantity}</span>
                                                </div>

                                                {/* Actions */}
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => navigate(`/product/${product.id}`)}
                                                        className="flex-1 btn btn-sm btn-outline border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black"
                                                    >
                                                        <Edit size={16} />
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteListing(product.id)}
                                                        className="btn btn-sm btn-outline border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'profile' && (
                    <div className="max-w-2xl">
                        <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                            <h2 className="text-2xl font-bold mb-6">Profile Information</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Username</label>
                                    <input
                                        type="text"
                                        value={user?.username || ''}
                                        disabled
                                        className="input input-bordered w-full bg-gray-800 border-gray-700"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Email</label>
                                    <input
                                        type="email"
                                        value={user?.email || ''}
                                        disabled
                                        className="input input-bordered w-full bg-gray-800 border-gray-700"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Member Since</label>
                                    <input
                                        type="text"
                                        value={new Date().toLocaleDateString()}
                                        disabled
                                        className="input input-bordered w-full bg-gray-800 border-gray-700"
                                    />
                                </div>
                                <div className="pt-4">
                                    <button className="btn bg-yellow-400 hover:bg-yellow-500 text-black font-bold">
                                        Update Profile
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
