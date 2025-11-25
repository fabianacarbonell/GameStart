import { useState } from 'react';
import { X } from 'lucide-react';

const Sell: React.FC = () => {
    const [productName, setProductName] = useState('');
    const [price, setPrice] = useState('');
    const [platform, setPlatform] = useState('PC');
    const [description, setDescription] = useState('');
    const [keyCount, setKeyCount] = useState(0);
    const [keys, setKeys] = useState<string[]>([]);

    const handleAddKey = () => {
        setKeys([...keys, '']);
        setKeyCount(keyCount + 1);
    };

    return (
        <div className="min-h-screen bg-base-100 py-8">
            <div className="container mx-auto px-4 max-w-4xl">
                <h1 className="text-3xl font-bold text-white mb-8">Sell your games</h1>

                <div className="bg-gray-900 rounded-lg p-8 border border-gray-800">
                    <form className="space-y-6">
                        {/* Product Name */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-white font-semibold">Product Name</span>
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Far Cry 5 (PC) Steam Key - EUROPE"
                                    value={productName}
                                    onChange={(e) => setProductName(e.target.value)}
                                    className="input input-bordered w-full bg-gray-800 border-gray-700 text-white pr-10"
                                />
                                {productName && (
                                    <button
                                        type="button"
                                        onClick={() => setProductName('')}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                                    >
                                        <X size={18} />
                                    </button>
                                )}
                            </div>
                            <label className="label">
                                <span className="label-text-alt text-primary cursor-pointer hover:underline">
                                    + Get Store Page
                                </span>
                            </label>
                        </div>

                        {/* Price */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-white font-semibold">Price</span>
                            </label>
                            <div className="flex items-center gap-2">
                                <span className="text-gray-400">€</span>
                                <input
                                    type="number"
                                    step="0.01"
                                    placeholder="23.99"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    className="input input-bordered w-32 bg-gray-800 border-gray-700 text-white"
                                />
                            </div>
                        </div>

                        {/* Platform */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-white font-semibold">Platform</span>
                            </label>
                            <div className="flex items-center gap-2">
                                <select
                                    value={platform}
                                    onChange={(e) => setPlatform(e.target.value)}
                                    className="select select-bordered bg-gray-800 border-gray-700 text-white w-32"
                                >
                                    <option>PC</option>
                                    <option>PS5</option>
                                    <option>PS4</option>
                                    <option>Xbox</option>
                                    <option>Switch</option>
                                </select>
                            </div>
                        </div>

                        {/* Game Description */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-white font-semibold">Game description</span>
                            </label>
                            <textarea
                                placeholder="Far Cry 5 is an open-world, first-person shooter set in fictional Hope County, Montana, where players must fight against a fanatical doomsday cult called Eden's Gate led by the charismatic leader, Joseph Seed."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="textarea textarea-bordered h-24 bg-gray-800 border-gray-700 text-white resize-none"
                            />
                        </div>

                        {/* Keys Section */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-white font-semibold">Enter the amount of keys to sell:</span>
                            </label>
                            <div className="flex items-center gap-4 mb-4">
                                <button
                                    type="button"
                                    onClick={() => setKeyCount(Math.max(0, keyCount - 1))}
                                    className="btn btn-circle btn-sm bg-gray-800 border-gray-700 hover:bg-gray-700"
                                >
                                    -
                                </button>
                                <span className="text-white font-bold text-lg w-8 text-center">{keyCount}</span>
                                <button
                                    type="button"
                                    onClick={handleAddKey}
                                    className="btn btn-circle btn-sm bg-gray-800 border-gray-700 hover:bg-gray-700"
                                >
                                    +
                                </button>
                            </div>

                            <div className="space-y-2">
                                <label className="label">
                                    <span className="label-text text-white font-semibold">Add keys</span>
                                </label>
                                <p className="text-sm text-gray-400 mb-3">
                                    You can type them manually or{' '}
                                    <button type="button" className="text-primary hover:underline">
                                        upload file
                                    </button>
                                    . Accepted file types: csv, txt, xls, accepted image files: png, jpg, pdf file size: 400 kb
                                </p>

                                {/* Key Input List */}
                                <div className="bg-gray-800 rounded-lg p-4 space-y-2 max-h-64 overflow-y-auto">
                                    {Array.from({ length: Math.max(11, keys.length) }).map((_, index) => (
                                        <div key={index} className="flex items-center gap-2">
                                            <span className="text-gray-500 text-sm w-6">{index + 1}</span>
                                            <input
                                                type="text"
                                                placeholder="Enter a key here..."
                                                value={keys[index] || ''}
                                                onChange={(e) => {
                                                    const newKeys = [...keys];
                                                    newKeys[index] = e.target.value;
                                                    setKeys(newKeys);
                                                }}
                                                className="input input-sm input-bordered flex-1 bg-gray-700 border-gray-600 text-white placeholder:text-gray-500"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-4 pt-4">
                            <button type="submit" className="btn btn-primary px-8">
                                Submit Keys
                            </button>
                            <button type="button" className="btn btn-outline btn-error px-8">
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Sell;
