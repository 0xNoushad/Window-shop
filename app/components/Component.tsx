"use client";  
import { useState } from 'react';
import Image from 'next/image';

const categories = [
  { id: 'hoodies', name: 'Hoodies', items: [
    { id: 1, image: '/assets/images/1.jpg', color: 'Black', price: 49.99 },
    { id: 2, image: '/assets/images/1.jpg', color: 'Gray', price: 54.99 },
  ]},
  { id: 'tee', name: 'Tee`', items: [
    { id: 1, image: '/assets/images/1.jpg', color: 'White', price: 29.99 },
    { id: 2, image: '/assets/images/1.jpg', color: 'Blue', price: 34.99 },
  ]},
  { id: 'trousers', name: 'Trousers', items: [
    { id: 1, image: '/assets/images/1.jpg', color: 'Gray', price: 59.99 },
    { id: 2, image: '/assets/images/1.jpg', color: 'Green and Yellow', price: 64.99 },
    { id: 3, image: '/assets/images/1.jpg', color: 'Pattern Gray', price: 69.99 },
    { id: 4, image: '/assets/images/1.jpg', color: 'Cream and Blue', price: 74.99 },
    { id: 5, image: '/assets/images/1.jpg', color: 'Black', price: 59.99 },
    { id: 6, image: '/assets/images/1.jpg', color: 'Gray and White', price: 64.99 },
  ]},
  { id: 't-shirts', name: 'T-Shirts', items: [
    { id: 1, image: '/assets/images/1.jpg', color: 'Red', price: 24.99 },
    { id: 2, image: '/assets/images/1.jpg', color: 'Green', price: 24.99 },
  ]},
];

export default function Component() {
  const [selectedCategory, setSelectedCategory] = useState('trousers')
  const [selectedItem, setSelectedItem] = useState(null)
  const [cart, setCart] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const addToCart = (item: { id: number; image: string; color: string; price: number; }) => {
    setCart([...cart, { ...item, cartId: Date.now() }])
  }

  const removeFromCart = (cartId) => {
    setCart(cart.filter(item => item.cartId !== cartId))
  }

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price, 0).toFixed(2)
  }

  const handleCheckout = () => {
    setIsCheckoutOpen(true)
  }

  const placeOrder = () => {
    setOrderPlaced(true)
    setCart([])
    setTimeout(() => {
      setOrderPlaced(false)
      setIsCheckoutOpen(false)
      setIsCartOpen(false)
    }, 3000)
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

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
        <div className="text-2xl font-bold">{categories.find(c => c.id === selectedCategory)?.name || 'Clothing Store'}</div>
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
                      setSelectedCategory(category.id)
                      setSelectedItem(null)
                      toggleMenu()
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
                    <li key={item.cartId} className="flex items-center justify-between mb-2 bg-[#c0c0c0] text-black p-2 border-2 border-t-white border-l-white border-b-gray-800 border-r-gray-800">
                      <div className="flex items-center">
                        <Image src={item.image} alt={`${item.color} ${categories.find(c => c.items.some(i => i.id === item.id))?.name}`} width={50} height={50} className="mr-2" />
                        <span>{item.color} - ${item.price}</span>
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
                      <span>{item.color} - ${item.price}</span>
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

      {/* Main Content */}
      <main>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {categories.find(c => c.id === selectedCategory)?.items.map(item => (
            <div key={item.id} className="bg-[#c0c0c0] text-black p-4 border-2 border-t-white border-l-white border-b-gray-800 border-r-gray-800 shadow">
              <Image src={item.image} alt={`${item.color} ${selectedCategory}`} width={150} height={150} className="mb-4" />
              <h3 className="text-xl font-bold">{item.color}</h3>
              <p className="mb-4">${item.price.toFixed(2)}</p>
              <button 
                onClick={() => addToCart(item)} 
                className="w-full bg-[#c0c0c0] text-black py-2 px-4 border-2 border-t-white border-l-white border-b-gray-800 border-r-gray-800 shadow hover:bg-gray-300"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
