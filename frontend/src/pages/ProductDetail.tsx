import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Heart, ShoppingCart, User, Package, Shield, ArrowLeft } from 'lucide-react';
import api from '../api/axios';
import { useCart } from '../context/CartContext';

interface Product {
    id: number;
    name: string;
    slug: string;
    description: string;
    price: string;
    discount_price: string | null;
    stock_quantity: number;
    platforms: string;
    condition: string;
    seller_username: string;
    images: { id: number; image: string }[];
    category: number;
    created_at: string;
}

const ProductDetail = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedImage, setSelectedImage] = useState(0);
    const [isWishlisted, setIsWishlisted] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await api.get(`/products/${id}/`);
                setProduct(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to load product details');
                setLoading(false);
            }
        };

        if (id) {
            fetchProduct();
        }
    }, [id]);

    const handleAddToCart = () => {
        if (product) {
            const price = product.discount_price ? parseFloat(product.discount_price) : parseFloat(product.price);
            addToCart({
                id: product.id,
                name: product.name,
                price: price,
                image: product.images[0]?.image || '/placeholder-game.jpg',
                platform: product.platforms,
            });
        }
    };

    const handleBuyNow = () => {
        handleAddToCart();
        navigate('/cart');
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="loading loading-spinner loading-lg text-yellow-400"></div>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
                    <button onClick={() => navigate('/browse')} className="btn btn-primary">
                        Browse Products
                    </button>
                </div>
            </div>
        );
    }

    const currentPrice = product.discount_price ? parseFloat(product.discount_price) : parseFloat(product.price);
    const originalPrice = product.discount_price ? parseFloat(product.price) : null;
    const discountPercent = originalPrice ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100) : 0;

    return (
        <div className="min-h-screen bg-black text-white py-8">
            <div className="container mx-auto px-4 max-w-7xl">
                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-gray-400 hover:text-yellow-400 mb-6 transition-colors"
                >
                    <ArrowLeft size={20} />
                    Back
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Image Gallery */}
                    <div className="space-y-4">
                        <div className="relative bg-gray-900 rounded-lg overflow-hidden aspect-video">
                            <img
                                src={product.images[selectedImage]?.image || '/placeholder-game.jpg'}
                                alt={product.name}
                                className="w-full h-full object-cover"
                            />
                            {discountPercent > 0 && (
                                <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-lg font-bold">
                                    -{discountPercent}%
                                </div>
                            )}
                            <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-lg font-semibold text-sm">
                                {product.platforms}
                            </div>
                        </div>

                        {/* Thumbnail Gallery */}
                        {product.images.length > 1 && (
                            <div className="flex gap-2 overflow-x-auto">
                                {product.images.map((img, index) => (
                                    <button
                                        key={img.id}
                                        onClick={() => setSelectedImage(index)}
                                        className={`flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden border-2 transition-all ${selectedImage === index
                                            ? 'border-yellow-400'
                                            : 'border-gray-700 hover:border-gray-600'
                                            }`}
                                    >
                                        <img
                                            src={img.image}
                                            alt={`${product.name} ${index + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product Info */}
                    <div className="space-y-6">
                        <div>
                            <h1 className="text-4xl font-bold mb-2">{product.name}</h1>
                            <div className="flex items-center gap-4 text-sm text-gray-400">
                                <span className="flex items-center gap-1">
                                    <Package size={16} />
                                    {product.condition}
                                </span>
                                <span className="flex items-center gap-1">
                                    <User size={16} />
                                    Sold by {product.seller_username || 'GameStart'}
                                </span>
                            </div>
                        </div>

                        {/* Price */}
                        <div className="bg-gray-900 rounded-lg p-6">
                            <div className="flex items-baseline gap-3 mb-2">
                                <span className="text-4xl font-black text-yellow-400">
                                    €{currentPrice.toFixed(2)}
                                </span>
                                {originalPrice && (
                                    <span className="text-2xl text-gray-500 line-through">
                                        €{originalPrice.toFixed(2)}
                                    </span>
                                )}
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                {product.stock_quantity > 0 ? (
                                    <span className="text-green-500 flex items-center gap-1">
                                        <Shield size={16} />
                                        In Stock ({product.stock_quantity} available)
                                    </span>
                                ) : (
                                    <span className="text-red-500">Out of Stock</span>
                                )}
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="space-y-3">
                            <button
                                onClick={handleBuyNow}
                                disabled={product.stock_quantity === 0}
                                className="w-full btn bg-yellow-400 hover:bg-yellow-500 text-black font-bold text-lg h-14 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <ShoppingCart size={20} />
                                Buy Now
                            </button>
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    onClick={handleAddToCart}
                                    disabled={product.stock_quantity === 0}
                                    className="btn btn-outline border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <ShoppingCart size={18} />
                                    Add to Cart
                                </button>
                                <button
                                    onClick={() => setIsWishlisted(!isWishlisted)}
                                    className={`btn btn-outline ${isWishlisted
                                        ? 'border-red-500 text-red-500 hover:bg-red-500'
                                        : 'border-gray-600 text-gray-400 hover:bg-gray-800'
                                        }`}
                                >
                                    <Heart size={18} fill={isWishlisted ? 'currentColor' : 'none'} />
                                    Wishlist
                                </button>
                            </div>
                        </div>

                        {/* Product Details */}
                        <div className="bg-gray-900 rounded-lg p-6 space-y-4">
                            <h3 className="text-xl font-bold">Product Details</h3>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Platform:</span>
                                    <span className="font-semibold">{product.platforms}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Condition:</span>
                                    <span className="font-semibold">{product.condition}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Seller:</span>
                                    <span className="font-semibold">{product.seller_username || 'GameStart Official'}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Listed:</span>
                                    <span className="font-semibold">
                                        {new Date(product.created_at).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="bg-gray-900 rounded-lg p-6">
                            <h3 className="text-xl font-bold mb-3">Description</h3>
                            <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                                {product.description}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
