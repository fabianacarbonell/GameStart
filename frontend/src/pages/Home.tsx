import React from 'react';
import { Link } from 'react-router-dom';
import GameCard from '../components/GameCard';
import { ChevronLeft, ChevronRight, TrendingUp, Zap, Star } from 'lucide-react';

const Home: React.FC = () => {
    // Mock data for MVP
    const trendingGames = [
        { id: 1, title: "Far Cry 5", price: 16.99, platform: "PC", image: "https://image.api.playstation.com/vulcan/ap/rnd/202009/2914/Ci9v9C1z9C1z9C1z9C1z9C1z.png", discount: 15 },
        { id: 2, title: "Minecraft", price: 18.99, platform: "PS4", image: "https://image.api.playstation.com/vulcan/img/rnd/202010/2119/9f1W1W1W1W1W1W1W1W1W1W1W.png" },
        { id: 3, title: "Elden Ring", price: 46.99, platform: "XBOX", image: "https://image.api.playstation.com/vulcan/ap/rnd/202110/2000/phvVT0qZfcRms5qDAk0SI3CM.png" },
        { id: 4, title: "Mario Kart 8", price: 39.99, platform: "SWITCH", image: "https://assets.nintendo.com/image/upload/ar_16:9,c_lpad,w_1240/b_white/f_auto/q_auto/ncom/software/switch/70010000000185/de697f48773747355555555555555555" },
        { id: 5, title: "Cyberpunk 2077", price: 29.99, platform: "PC", image: "https://image.api.playstation.com/vulcan/ap/rnd/202009/2914/Ci9v9C1z9C1z9C1z9C1z9C1z.png" },
    ];

    const featuredDeals = [
        { id: 6, title: "God of War", price: 24.99, platform: "PS5", image: "https://image.api.playstation.com/vulcan/ap/rnd/202009/2914/Ci9v9C1z9C1z9C1z9C1z9C1z.png", discount: 50 },
        { id: 7, title: "Halo Infinite", price: 19.99, platform: "XBOX", image: "https://image.api.playstation.com/vulcan/ap/rnd/202110/2000/phvVT0qZfcRms5qDAk0SI3CM.png", discount: 60 },
        { id: 8, title: "The Witcher 3", price: 14.99, platform: "PC", image: "https://image.api.playstation.com/vulcan/ap/rnd/202009/2914/Ci9v9C1z9C1z9C1z9C1z9C1z.png", discount: 70 },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-950 to-black">
            {/* Hero Section */}
            <div className="relative h-[500px] w-full overflow-hidden">
                {/* Background with gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 via-yellow-400 to-orange-500">
                    <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/60"></div>
                </div>

                <div className="container mx-auto px-4 h-full flex items-center relative z-10">
                    <div className="w-full md:w-1/2 space-y-6">
                        <div className="inline-block">
                            <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                                New Arrival
                            </span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black leading-tight text-white drop-shadow-2xl">
                            CyberPunk 2077
                        </h1>
                        <p className="text-xl md:text-2xl font-semibold text-white drop-shadow-lg">
                            Massive discount - Limited time offer!
                        </p>
                        <div className="flex gap-4 pt-4">
                            <Link to="/browse" className="btn btn-primary btn-lg rounded-full px-8 text-black font-bold hover:scale-105 transition-transform shadow-xl">
                                Buy Now
                            </Link>
                            <button className="btn btn-outline btn-lg rounded-full px-8 text-white border-white hover:bg-white hover:text-black font-bold shadow-xl">
                                Learn More
                            </button>
                        </div>
                    </div>

                    {/* Hero Image */}
                    <div className="hidden md:block w-1/2 relative h-full">
                        <div
                            className="absolute right-0 top-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-contain bg-center bg-no-repeat drop-shadow-2xl"
                            style={{ backgroundImage: 'url(https://upload.wikimedia.org/wikipedia/en/9/9f/Cyberpunk_2077_box_art.jpg)' }}
                        ></div>
                    </div>
                </div>

                {/* Navigation Buttons */}
                <button className="absolute left-4 top-1/2 -translate-y-1/2 btn btn-circle bg-black/50 hover:bg-black/70 text-white border-white/20 backdrop-blur-sm">
                    <ChevronLeft size={28} />
                </button>
                <button className="absolute right-4 top-1/2 -translate-y-1/2 btn btn-circle bg-black/50 hover:bg-black/70 text-white border-white/20 backdrop-blur-sm">
                    <ChevronRight size={28} />
                </button>

                {/* Carousel Indicators */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                    <div className="w-8 h-1 bg-white rounded-full"></div>
                    <div className="w-8 h-1 bg-white/30 rounded-full"></div>
                    <div className="w-8 h-1 bg-white/30 rounded-full"></div>
                </div>
            </div>

            {/* Featured Deals Section */}
            <div className="container mx-auto px-4 py-16">
                <div className="flex items-center gap-3 mb-8">
                    <Zap className="text-yellow-400" size={32} />
                    <h2 className="text-3xl font-black text-white">Flash Deals</h2>
                    <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full ml-2">
                        Limited Time
                    </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                    {featuredDeals.map(game => (
                        <div key={game.id} className="relative group">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl opacity-75 group-hover:opacity-100 blur transition duration-300"></div>
                            <div className="relative">
                                <GameCard {...game} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Trending Section */}
            <div className="container mx-auto px-4 pb-20">
                <div className="flex justify-between items-center mb-8">
                    <div className="flex items-center gap-3">
                        <TrendingUp className="text-yellow-400" size={32} />
                        <h2 className="text-3xl font-black text-white">Now Trending</h2>
                    </div>
                    <Link to="/browse" className="text-yellow-400 hover:text-yellow-300 font-semibold flex items-center gap-2 transition-colors">
                        Explore All
                        <ChevronRight size={20} />
                    </Link>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {trendingGames.map(game => (
                        <GameCard key={game.id} {...game} />
                    ))}
                </div>
            </div>

            {/* Why Choose Us Section */}
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 py-16 border-t border-gray-700">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-black text-white text-center mb-12">Why Choose GameStart?</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center space-y-4">
                            <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto">
                                <Star className="text-black" size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-white">Best Prices</h3>
                            <p className="text-gray-300">
                                Compare prices from multiple sellers and get the best deals on your favorite games.
                            </p>
                        </div>

                        <div className="text-center space-y-4">
                            <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto">
                                <Zap className="text-black" size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-white">Instant Delivery</h3>
                            <p className="text-gray-300">
                                Get your game keys instantly after purchase. No waiting, start playing right away.
                            </p>
                        </div>

                        <div className="text-center space-y-4">
                            <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto">
                                <TrendingUp className="text-black" size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-white">Trusted Sellers</h3>
                            <p className="text-gray-300">
                                All sellers are verified. Buy with confidence from our trusted marketplace.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
