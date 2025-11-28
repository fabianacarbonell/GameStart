import { useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Cart = () => {
    const navigate = useNavigate();
    const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();

    if (cart.length === 0) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <div className="text-center space-y-4">
                    <ShoppingBag size={64} className="mx-auto text-gray-600" />
                    <h2 className="text-3xl font-bold">Your Cart is Empty</h2>
                    <p className="text-gray-400">Add some games to get started!</p>
                    <button
                        onClick={() => navigate('/browse')}
                        className="btn bg-yellow-400 hover:bg-yellow-500 text-black font-bold mt-4"
                    >
                        Browse Games
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white py-8">
            <div className="container mx-auto px-4 max-w-6xl">
                <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        {cart.map((item) => (
                            <div
                                key={item.id}
                                className="bg-gray-900 rounded-lg p-4 flex gap-4 border border-gray-800 hover:border-gray-700 transition-colors"
                            >
                                {/* Image */}
                                <img
                                    src={item.image || "https://placehold.co/600x400/1f2937/white?text=No+Image"}
                                    alt={item.name}
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.src = "https://placehold.co/600x400/1f2937/white?text=No+Image";
                                    }}
                                    className="w-24 h-24 object-cover rounded-lg"
                                />

                                {/* Info */}
                                <div className="flex-grow">
                                    <h3 className="font-bold text-lg mb-1">{item.name}</h3>
                                    <p className="text-sm text-gray-400 mb-2">
                                        Platform: {item.platform}
                                    </p>
                                    <div className="flex items-center gap-4">
                                        {/* Quantity Controls */}
                                        <div className="flex items-center gap-2 bg-gray-800 rounded-lg p-1">
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                className="btn btn-sm btn-ghost hover:bg-gray-700"
                                            >
                                                <Minus size={16} />
                                            </button>
                                            <span className="w-8 text-center font-semibold">
                                                {item.quantity}
                                            </span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="btn btn-sm btn-ghost hover:bg-gray-700"
                                            >
                                                <Plus size={16} />
                                            </button>
                                        </div>

                                        {/* Price */}
                                        <span className="text-xl font-bold text-yellow-400">
                                            €{(item.price * item.quantity).toFixed(2)}
                                        </span>
                                    </div>
                                </div>

                                {/* Remove Button */}
                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    className="btn btn-ghost btn-sm text-red-500 hover:bg-red-500/10"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        ))}

                        {/* Clear Cart */}
                        <button
                            onClick={clearCart}
                            className="btn btn-outline border-red-500 text-red-500 hover:bg-red-500 hover:text-white w-full"
                        >
                            <Trash2 size={18} />
                            Clear Cart
                        </button>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-gray-900 rounded-lg p-6 border border-gray-800 sticky top-4">
                            <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between text-gray-400">
                                    <span>Subtotal</span>
                                    <span>€{cartTotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-400">
                                    <span>Shipping</span>
                                    <span className="text-green-500">FREE</span>
                                </div>
                                <div className="border-t border-gray-800 pt-3">
                                    <div className="flex justify-between text-xl font-bold">
                                        <span>Total</span>
                                        <span className="text-yellow-400">€{cartTotal.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={() => navigate('/checkout')}
                                className="w-full btn bg-yellow-400 hover:bg-yellow-500 text-black font-bold text-lg h-12 mb-3"
                            >
                                Proceed to Checkout
                            </button>

                            <button
                                onClick={() => navigate('/browse')}
                                className="w-full btn btn-outline border-gray-600 text-gray-400 hover:bg-gray-800"
                            >
                                Continue Shopping
                            </button>

                            {/* Features */}
                            <div className="mt-6 pt-6 border-t border-gray-800 space-y-3 text-sm">
                                <div className="flex items-center gap-2 text-gray-400">
                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                    <span>Secure Checkout</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-400">
                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                    <span>Instant Delivery</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-400">
                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                    <span>Money-back Guarantee</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
