"use client";

import { useState } from 'react';
import Image from 'next/image';

interface Item {
  id: number;
  image: string;
  color: string;
  price: number;
  sizes: string[];
}

interface Category {
  id: string;
  name: string;
  items: Item[];
}

const categories: Category[] = [
  { id: 'hoodies', name: 'Hoodies', items: [
    { id: 1, image: 'https://i.pinimg.com/736x/1c/ed/7f/1ced7f3d930b825af563054c2a456c46.jpg', color: 'Black', price: 99.99, sizes: ['S', 'M', 'L', 'XL'] },
    { id: 2, image: 'https://i.pinimg.com/474x/47/70/37/4770376c01e4ff7ace28bf0f8eda0bf2.jpg', color: 'Green', price: 99.99, sizes: ['S', 'M', 'L'] },
  ]},
  { id: 'jacket', name: 'Jacket', items: [
    { id: 1, image: 'https://i.pinimg.com/564x/dc/91/5e/dc915ec8076532e666348d2cdaf57858.jpg', color: 'Embroidery', price: 99.99, sizes: ['S', 'M', 'L'] },
    { id: 2, image: 'https://i.pinimg.com/736x/c2/85/49/c28549be845ccb55e462e3a5a9761fc9.jpg', color: 'Vintage', price: 99.99, sizes: ['M', 'L', 'XL'] },
  ]},
  { id: 'trousers', name: 'Trousers', items: [
    { id: 1, image: 'https://i.pinimg.com/736x/7a/13/b0/7a13b009599c97d769f341ec9ff7c078.jpg', color: 'Black', price: 99.99, sizes: ['M', 'L', 'XL'] },
    { id: 2, image: 'https://i.pinimg.com/736x/0c/4e/f2/0c4ef27429dc4332a4a2364ee8257c2b.jpg', color: 'Khaki', price: 99.99, sizes: ['L', 'XL'] },
  ]},
  { id: 't-shirts', name: 'T-Shirts', items: [
    { id: 1, image: 'https://i.pinimg.com/564x/e6/67/22/e66722335a6ab4faa9f090474eec9c43.jpg', color: 'Washed', price: 99.99, sizes: ['S', 'M', 'L'] },
  ]},
];

interface CartItem extends Item {
  cartId: number;
  size: string;
}

export default function Component() {
  const [selectedCategory, setSelectedCategory] = useState<string>('trousers');
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [orderPlaced, setOrderPlaced] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [selectedSize, setSelectedSize] = useState<string>('');

  const addToCart = (item: Item) => {
    if (!selectedSize) {
      alert('Please select a size.');
      return;
    }
    setCart([...cart, { ...item, cartId: Date.now(), size: selectedSize }]);
    setSelectedSize('');
    setSelectedItem(null);
  };

  const removeFromCart = (cartId: number) => {
    setCart(cart.filter(item => item.cartId !== cartId));
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price, 0).toFixed(2);
  };

  const handleCheckout = () => {
    setIsCheckoutOpen(true);
  };

  const placeOrder = () => {
    setOrderPlaced(true);
    setCart([]);
    setTimeout(() => {
      setOrderPlaced(false);
      setIsCheckoutOpen(false);
      setIsCartOpen(false);
    }, 3000);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="min-h-screen bg-[#000080] text-white p-4 relative font-mono">
      <style jsx global>{`
        @font-face {
          font-family: 'MS Sans Serif';
          src: url('/fonts/MS-Sans-Serif.woff2') format('woff2');
        }
        body {
          font-family: 'MS Sans Serif', 'Courier New', monospace;
        }
      `}</style>

      {/* Header */}
      <header className="flex justify-between items-center mb-8 bg-[#000080] p-2 border-b-2 border-white">
        <div className="text-2xl font-bold">
          {categories.find(c => c.id === selectedCategory)?.name || 'Clothing Store'}
        </div>
        <div className="flex space-x-4 items-center">
          <button 
            className="p-2 bg-[#c0c0c0] text-black border-2 border-t-white border-l-white border-b-gray-800 border-r-gray-800 shadow relative"
            onClick={() => setIsCartOpen(!isCartOpen)}
          >
            Cart ({cart.length})
          </button>
          <button className="p-2 bg-[#c0c0c0] text-black border-2 border-t-white border-l-white border-b-gray-800 border-r-gray-800 shadow" onClick={toggleMenu}>
            Menu
          </button>
        </div>
      </header>

      {/* Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center">
          <div className="bg-[#000080] p-8 border-2 border-white w-80">
            <button onClick={toggleMenu} className="absolute top-4 right-4 text-4xl bg-[#c0c0c0] text-black px-4 py-2 border-2 border-t-white border-l-white border-b-gray-800 border-r-gray-800 shadow">&times;</button>
            <ul className="text-xl space-y-4">
              {categories.map(category => (
                <li key={category.id}>
                  <button 
                    className="w-full text-left p-2 bg-[#c0c0c0] text-black border-2 border-t-white border-l-white border-b-gray-800 border-r-gray-800 shadow hover:bg-gray-300"
                    onClick={() => {
                      setSelectedCategory(category.id);
                      setSelectedItem(null);
                      toggleMenu();
                    }}
                  >
                    {category.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Cart */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex justify-end">
          <div className="bg-[#000080] w-full max-w-md p-4 h-full overflow-y-auto border-l-2 border-white">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Cart</h2>
              <button onClick={() => setIsCartOpen(false)} className="text-2xl bg-[#c0c0c0] text-black px-4 py-2 border-2 border-t-white border-l-white border-b-gray-800 border-r-gray-800 shadow">&times;</button>
            </div>
            {cart.length === 0 ? (
              <p>Your cart is empty</p>
            ) : (
              <>
                <ul className="mb-4">
                  {cart.map((item) => (
                    <li key={item.cartId} className="flex items-center justify-between mb-2 bg-[#c0c0c0] text-black p-2 border-2 border-t-white border-l-white border-b-gray-800 border-r-gray-800 shadow">
                      <div className="flex items-center">
                        <Image src={item.image} alt={`${item.color} ${categories.find(c => c.items.some(i => i.id === item.id))?.name}`} width={80} height={80} className="mr-2 object-cover" />
                        <span>{item.color} - ${item.price} - Size: {item.size}</span>
                      </div>
                      <button onClick={() => removeFromCart(item.cartId)} className="bg-[#c0c0c0] text-black px-2 py-1 border-2 border-t-white border-l-white border-b-gray-800 border-r-gray-800 shadow">Remove</button>
                    </li>
                  ))}
                </ul>
                <div className="flex justify-between items-center mb-4 bg-[#c0c0c0] text-black p-2 border-2 border-t-white border-l-white border-b-gray-800 border-r-gray-800">
                  <span className="font-bold">Total:</span>
                  <span>${getTotalPrice()}</span>
                </div>
                <button 
                  onClick={handleCheckout} 
                  className="w-full bg-[#c0c0c0] text-black py-2 px-4 border-2 border-t-white border-l-white border-b-gray-800 border-r-gray-800 shadow hover:bg-gray-300"
                >
                  Buy Now
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Checkout */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center">
          <div className="bg-[#000080] w-full max-w-md p-4 border-2 border-white">
            <h2 className="text-2xl font-bold mb-4">Checkout</h2>
            {orderPlaced ? (
              <p className="text-lg">Thank you! Your order has been placed.</p>
            ) : (
              <>
                <ul className="mb-4">
                  {cart.map((item) => (
                    <li key={item.cartId} className="flex items-center justify-between mb-2">
                      <span>{item.color} - ${item.price} - Size: {item.size}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex justify-between items-center mb-4">
                  <span className="font-bold">Total:</span>
                  <span>${getTotalPrice()}</span>
                </div>
                <button 
                  onClick={placeOrder} 
                  className="w-full bg-[#c0c0c0] text-black py-2 px-4 border-2 border-t-white border-l-white border-b-gray-800 border-r-gray-800 shadow hover:bg-gray-300"
                >
                  Place Order
                </button>
              </>
            )}
          </div>
        </div>
      )}

{/* Item Selection Modal */}
{selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center">
          <div className="bg-[#000080] w-full max-w-md p-4 border-2 border-white">
            <button onClick={() => setSelectedItem(null)} className="absolute top-4 right-4 text-4xl bg-[#c0c0c0] text-black px-4 py-2 border-2 border-t-white border-l-white border-b-gray-800 border-r-gray-800 shadow">&times;</button>
            <Image src={selectedItem.image} alt={`${selectedItem.color} ${selectedCategory}`} width={200} height={200} className="mb-4" />
            <h3 className="text-xl font-bold">{selectedItem.color}</h3>
            <p className="mb-4">${selectedItem.price.toFixed(2)}</p>
            <select 
              className="w-full p-2 mb-4 bg-[#c0c0c0] text-black border-2 border-t-white border-l-white border-b-gray-800 border-r-gray-800 shadow"
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
            >
              <option value="">Select size</option>
              {selectedItem.sizes.map(size => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
            <button 
              onClick={() => addToCart(selectedItem)} 
              className="w-full bg-[#c0c0c0] text-black py-2 px-4 border-2 border-t-white border-l-white border-b-gray-800 border-r-gray-800 shadow hover:bg-gray-300"
            >
              Add to Cart
            </button>
          </div>
        </div>
      )}


    {/* Main Content */}
<main>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
    {categories.find(c => c.id === selectedCategory)?.items.map(item => (
      <div key={item.id} className="bg-[#c0c0c0] text-black p-2 border-2 border-t-white border-l-white border-b-gray-800 border-r-gray-800 shadow flex flex-col items-center">
        <div className="flex-grow flex items-center justify-center mb-4">
          <Image 
            src={item.image} 
            alt={`${item.color} ${categories.find(c => c.id === selectedCategory)?.name}`} 
            layout="intrinsic" 
            width={300} 
            height={300} 
            className="object-cover"
          />
        </div>
        <h3 className="text-xl font-bold mb-2">{item.color}</h3>
        <p className="mb-4">${item.price.toFixed(2)}</p>
        <button 
          onClick={() => setSelectedItem(item)} 
          className="w-full bg-[#c0c0c0] text-black py-2 px-4 border-2 border-t-white border-l-white border-b-gray-800 border-r-gray-800 shadow hover:bg-gray-300"
        >
          Select Size
        </button>
      </div>
    ))}
  </div>
</main>

    </div>
  );
}
