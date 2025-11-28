import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GameCard from '../components/GameCard';
import { List, Grid3x3, ShoppingCart, Heart } from 'lucide-react';

const Browse: React.FC = () => {
    const navigate = useNavigate();
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');

    // Mock data
    const games = [
        { id: 1, title: "Far Cry 5", price: 16.99, platform: "PC", image: "https://upload.wikimedia.org/wikipedia/en/8/8c/Far_Cry_5_box_art.jpg", discount: 15 },
        { id: 2, title: "Minecraft", price: 18.99, platform: "PS4", image: "https://upload.wikimedia.org/wikipedia/en/5/51/Minecraft_cover.png" },
        { id: 3, title: "Elden Ring", price: 46.99, platform: "XBOX", image: "https://upload.wikimedia.org/wikipedia/en/b/b9/Elden_Ring_Box_Art.jpg" },
        { id: 4, title: "Mario Kart 8", price: 39.99, platform: "SWITCH", image: "https://upload.wikimedia.org/wikipedia/en/b/b5/MarioKart8Boxart.jpg" },
        { id: 5, title: "Cyberpunk 2077", price: 29.99, platform: "PC", image: "https://upload.wikimedia.org/wikipedia/en/9/9f/Cyberpunk_2077_box_art.jpg" },
        { id: 6, title: "God of War", price: 24.99, platform: "PS5", image: "https://upload.wikimedia.org/wikipedia/en/a/a7/God_of_War_4_cover.jpg", discount: 50 },
        { id: 7, title: "Halo Infinite", price: 19.99, platform: "XBOX", image: "https://upload.wikimedia.org/wikipedia/en/1/14/Halo_Infinite.png", discount: 60 },
        { id: 8, title: "The Witcher 3", price: 14.99, platform: "PC", image: "https://upload.wikimedia.org/wikipedia/en/0/0c/Witcher_3_cover_art.jpg", discount: 70 },
        { id: 9, title: "Red Dead Redemption 2", price: 19.99, platform: "PS4", image: "https://upload.wikimedia.org/wikipedia/en/4/44/Red_Dead_Redemption_II.jpg", discount: 65 },
        { id: 10, title: "FIFA 23", price: 59.99, platform: "XBOX", image: "https://upload.wikimedia.org/wikipedia/en/a/a6/FIFA_23_Cover.jpg" },
    ];

    return (
        <div className="min-h-screen bg-base-100">
            <div className="container mx-auto px-4 py-6">
                <div className="flex flex-col md:flex-row gap-6">
                    {/* Sidebar Filters */}
                    <div className="w-full md:w-64 flex-shrink-0">
                        <div className="bg-gray-900 rounded-lg p-4 space-y-6 border border-gray-800">
                            {/* Categories */}
                            <div>
                                <h3 className="font-bold text-white mb-3 text-sm uppercase tracking-wide">Categories</h3>
                                <ul className="space-y-2 text-sm">
                                    <li className="flex justify-between text-gray-300 hover:text-white cursor-pointer transition-colors">
                                        <span>Games</span>
                                        <span className="text-gray-500">75309</span>
                                    </li>
                                    <li className="flex justify-between text-gray-300 hover:text-white cursor-pointer transition-colors">
                                        <span>DLCs</span>
                                        <span className="text-gray-500">16910</span>
                                    </li>
                                    <li className="flex justify-between text-gray-300 hover:text-white cursor-pointer transition-colors">
                                        <span>Gaming Subscriptions</span>
                                        <span className="text-gray-500">487</span>
                                    </li>
                                    <li className="flex justify-between text-gray-300 hover:text-white cursor-pointer transition-colors">
                                        <span>Game Points</span>
                                        <span className="text-gray-500">1915</span>
                                    </li>
                                    <li className="flex justify-between text-gray-300 hover:text-white cursor-pointer transition-colors">
                                        <span>Gift Cards</span>
                                        <span className="text-gray-500">8068</span>
                                    </li>
                                    <li className="flex justify-between text-gray-300 hover:text-white cursor-pointer transition-colors">
                                        <span>Game Guides</span>
                                        <span className="text-gray-500">124</span>
                                    </li>
                                </ul>
                                <button className="text-primary text-xs mt-3 hover:underline">Show 2 more</button>
                            </div>

                            {/* Availability */}
                            <div>
                                <h3 className="font-bold text-white mb-3 text-sm uppercase tracking-wide">Availability</h3>
                                <div className="form-control">
                                    <label className="label cursor-pointer justify-start gap-2 py-1">
                                        <input type="checkbox" className="checkbox checkbox-xs checkbox-primary" />
                                        <span className="label-text text-gray-300 text-sm">Items available in Ireland</span>
                                    </label>
                                    <label className="label cursor-pointer justify-start gap-2 py-1">
                                        <input type="checkbox" className="checkbox checkbox-xs checkbox-primary" />
                                        <span className="label-text text-gray-300 text-sm">Items in stock</span>
                                        <span className="text-gray-500 text-xs ml-auto">34153</span>
                                    </label>
                                </div>
                            </div>

                            {/* Platform */}
                            <div>
                                <h3 className="font-bold text-white mb-3 text-sm uppercase tracking-wide flex items-center gap-2">
                                    Platform
                                    <span className="text-gray-500 text-xs">ⓘ</span>
                                </h3>
                                <div className="form-control space-y-1">
                                    <label className="label cursor-pointer justify-start gap-2 py-1">
                                        <input type="checkbox" className="checkbox checkbox-xs checkbox-primary" />
                                        <span className="label-text text-gray-300 text-sm">Steam</span>
                                        <span className="text-gray-500 text-xs ml-auto">77131</span>
                                    </label>
                                    <label className="label cursor-pointer justify-start gap-2 py-1">
                                        <input type="checkbox" className="checkbox checkbox-xs checkbox-primary" />
                                        <span className="label-text text-gray-300 text-sm">Xbox Live</span>
                                        <span className="text-gray-500 text-xs ml-auto">11297</span>
                                    </label>
                                    <label className="label cursor-pointer justify-start gap-2 py-1">
                                        <input type="checkbox" className="checkbox checkbox-xs checkbox-primary" />
                                        <span className="label-text text-gray-300 text-sm">PSN</span>
                                        <span className="text-gray-500 text-xs ml-auto">2668</span>
                                    </label>
                                    <label className="label cursor-pointer justify-start gap-2 py-1">
                                        <input type="checkbox" className="checkbox checkbox-xs checkbox-primary" />
                                        <span className="label-text text-gray-300 text-sm">Favourite Account</span>
                                        <span className="text-gray-500 text-xs ml-auto">2533</span>
                                    </label>
                                    <label className="label cursor-pointer justify-start gap-2 py-1">
                                        <input type="checkbox" className="checkbox checkbox-xs checkbox-primary" />
                                        <span className="label-text text-gray-300 text-sm">Nintendo eShop</span>
                                        <span className="text-gray-500 text-xs ml-auto">1663</span>
                                    </label>
                                </div>
                                <button className="text-primary text-xs mt-3 hover:underline">Show All 40</button>
                            </div>

                            {/* Price */}
                            <div>
                                <h3 className="font-bold text-white mb-3 text-sm uppercase tracking-wide">Price (EUR)</h3>
                                <div className="flex gap-2">
                                    <input type="number" placeholder="0" className="input input-xs input-bordered w-full bg-gray-800 border-gray-700 text-white" />
                                    <span className="text-gray-500 self-center">-</span>
                                    <input type="number" placeholder="∞" className="input input-xs input-bordered w-full bg-gray-800 border-gray-700 text-white" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1">
                        {/* Header */}
                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-2xl font-bold text-white">Browse All Games</h1>
                            <div className="flex items-center gap-4">
                                {/* View Toggle */}
                                <div className="join border border-gray-700">
                                    <button
                                        className={`btn btn-xs join-item ${viewMode === 'grid' ? 'btn-active bg-gray-700' : 'bg-gray-900 hover:bg-gray-800'} border-none`}
                                        onClick={() => setViewMode('grid')}
                                    >
                                        <Grid3x3 size={14} />
                                    </button>
                                    <button
                                        className={`btn btn-xs join-item ${viewMode === 'list' ? 'btn-active bg-gray-700' : 'bg-gray-900 hover:bg-gray-800'} border-none`}
                                        onClick={() => setViewMode('list')}
                                    >
                                        <List size={14} />
                                    </button>
                                </div>

                                {/* Sort */}
                                <select className="select select-sm select-bordered bg-gray-900 border-gray-700 text-white text-sm">
                                    <option>Sort by: Best Match</option>
                                    <option>Price: Low to High</option>
                                    <option>Price: High to Low</option>
                                    <option>Newest First</option>
                                </select>
                            </div>
                        </div>

                        {/* Products Grid/List */}
                        <div className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" : "flex flex-col gap-3"}>
                            {games.map((game) => (
                                viewMode === 'grid' ? (
                                    <GameCard key={game.id} id={game.id} title={game.title} price={game.price} image={game.image} platform={game.platform} discount={game.discount} />
                                ) : (
                                    <div
                                        key={game.id}
                                        onClick={() => navigate(`/product/${game.id}`)}
                                        className="card card-side bg-gray-900 shadow-xl border border-gray-800 hover:border-yellow-400 transition-all cursor-pointer"
                                    >
                                        <figure className="w-40 h-32 overflow-hidden flex-shrink-0">
                                            <img
                                                src={game.image || "https://placehold.co/600x400/1f2937/white?text=No+Image"}
                                                alt={game.title}
                                                onError={(e) => {
                                                    const target = e.target as HTMLImageElement;
                                                    target.src = "https://placehold.co/600x400/1f2937/white?text=No+Image";
                                                }}
                                                className="w-full h-full object-cover"
                                            />
                                        </figure>
                                        <div className="card-body p-4 flex-row justify-between items-center">
                                            <div className="flex-1">
                                                <h2 className="card-title text-white text-base mb-1">{game.title}</h2>
                                                <div className="text-xs text-gray-400 space-y-1">
                                                    <p>Platform: <span className="text-white">{game.platform}</span></p>
                                                    <p>Region: <span className="text-green-400">GLOBAL</span></p>
                                                    <p className="text-gray-500">Offers from <span className="text-white">17</span> sellers</p>
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-end gap-2">
                                                <div className="text-right">
                                                    <div className="flex items-center gap-2">
                                                        <p className="text-2xl font-bold text-white">€{game.price}</p>
                                                        {game.discount && <span className="badge badge-error badge-sm">-{game.discount}%</span>}
                                                    </div>
                                                    {game.discount && (
                                                        <p className="text-xs text-gray-500 line-through">€{(game.price * (1 + game.discount / 100)).toFixed(2)}</p>
                                                    )}
                                                </div>
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={(e) => e.stopPropagation()}
                                                        className="btn btn-circle btn-sm btn-ghost hover:text-red-500 text-gray-400"
                                                    >
                                                        <Heart size={18} />
                                                    </button>
                                                    <button
                                                        onClick={(e) => e.stopPropagation()}
                                                        className="btn btn-sm bg-yellow-400 hover:bg-yellow-500 border-none rounded-full px-6 text-black font-semibold shadow-lg hover:shadow-yellow-400/50"
                                                    >
                                                        <ShoppingCart size={16} />
                                                        Add to Cart
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Browse;
