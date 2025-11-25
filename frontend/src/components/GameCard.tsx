import React from 'react';
import { Heart, ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

interface GameProps {
    id: number;
    title: string;
    price: number;
    image: string;
    platform: string;
    discount?: number;
}

const GameCard: React.FC<GameProps> = ({ id, title, price, image, platform, discount }) => {
    const navigate = useNavigate();
    const { addToCart } = useCart();

    const handleAddToCart = (e: React.MouseEvent) => {
        e.stopPropagation();
        addToCart({
            id,
            name: title,
            price,
            image,
            platform,
        });
    };

    return (
        <div
            onClick={() => navigate(`/product/${id}`)}
            className="card bg-gray-900 shadow-xl hover:shadow-2xl transition-all duration-300 group border-2 border-gray-800 hover:border-yellow-400 cursor-pointer"
        >
            <figure className="relative h-48 overflow-hidden bg-gray-800">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                {/* Platform Badge */}
                <div className="absolute top-3 left-3">
                    <div className="badge badge-md bg-blue-600 border-none text-white font-bold px-3 shadow-lg">
                        {platform === 'PS4' ? 'PS4' : platform}
                    </div>
                </div>
                {/* Discount Badge */}
                {discount && (
                    <div className="absolute top-3 right-3">
                        <div className="badge badge-md bg-red-600 border-none text-white font-bold px-3 shadow-lg">
                            -{discount}%
                        </div>
                    </div>
                )}
            </figure>

            <div className="card-body p-4">
                <h2 className="card-title text-sm md:text-base text-white font-bold h-12 overflow-hidden line-clamp-2">
                    {title}
                </h2>

                <div className="flex justify-between items-end mt-2">
                    <div className="flex flex-col">
                        {discount && (
                            <span className="text-xs text-gray-400 line-through">
                                €{(price / (1 - discount / 100)).toFixed(2)}
                            </span>
                        )}
                        <span className="text-2xl font-black text-white">
                            €{price.toFixed(2)}
                        </span>
                        {discount && (
                            <span className="text-xs text-red-400 font-bold">
                                SAVE {discount}%
                            </span>
                        )}
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={(e) => e.stopPropagation()}
                            className="btn btn-circle btn-sm bg-gray-800 hover:bg-red-600 border-gray-700 hover:border-red-600 text-gray-300 hover:text-white transition-all"
                        >
                            <Heart size={18} />
                        </button>
                        <button
                            onClick={handleAddToCart}
                            className="btn btn-circle btn-sm btn-primary text-black hover:bg-yellow-300 transition-all shadow-lg"
                        >
                            <ShoppingCart size={18} />
                        </button>
                    </div>
                </div>

                {/* Additional Info */}
                <div className="text-xs text-gray-400 mt-2 pt-2 border-t border-gray-800">
                    Offers from <span className="text-yellow-400 font-semibold">17</span> sellers
                </div>
            </div>
        </div>
    );
};

export default GameCard;
