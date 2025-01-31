'use client';
import { useState } from 'react';
import Image from "next/image";
import deliver from "../../../Assets/deliver.png";
import { useCart } from "../Context/CartContext";
import ContactInfo from "../Components/Contact";
import order from "../../../Assets/order.png"

export default function Checkout() {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const { items, clearCart } = useCart();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState(''); // New state for selecting the state

  const subtotal = items.reduce((total, item) => {
    const price = parseFloat(item.price.replace(/[^0-9.]/g, ''));
    return total + (price * item.quantity);
  }, 0);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate if all required fields are filled
    if (!name || !email || !phone || !address || !postalCode || !city || !state) {
      alert("Please fill out all the required fields.");
      return;
    }

    const orderData = {
      name,
      email,
      phone,
      address,
      postalCode,
      city,
      state,
      cartItems: items.map(item => ({
        name: item.productName,
        price: parseFloat(item.price.replace(/[^0-9.]/g, '')),
        quantity: item.quantity,
      })),
      total: subtotal,
    };

    // Send the order data to the API
    const response = await fetch('/api/createOrder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });

    const data = await response.json();

    if (response.ok) {
      setIsConfirmed(true);
      clearCart();
    } else {
      alert(data.error || 'There was an issue placing your order.');
    }
  };

  if (isConfirmed) {
    return (
      <div className="flex items-center justify-center min-h-[50vh] mt-6">
        <div className="text-center">
          <div className='flex flex-col justify-center items-center mb-4'>
            <Image src={order} alt='check' className='w-[40px] h-[40px]' />
          </div>
          <h1 className="text-2xl font-bold mb-4">Your order is confirmed!</h1>
          <p className="text-gray-600">Thank you for shopping with us.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col lg:flex-row lg:justify-between lg:gap-8">
          <div className="lg:w-2/3 xl:w-3/5">
            <div>
              <h1 className="font-medium text-[16px]">
                How would you like to get your order?
              </h1>
            </div>

            <div className="flex flex-col justify-center items-center mt-4">
              <div className="flex gap-4 w-[250px] h-[50px] border border-black rounded-md justify-start items-center p-4">
                <Image src={deliver} alt="deliver" className="w-4 h-4" />
                <p className="font-medium text-[12px]">Deliver It</p>
              </div>
            </div>

            <h1 className="text-[16px] font-medium mt-2 text-center">
              Enter your name and address:
            </h1>

            <div className="mt-4 flex flex-col gap-4">
              <input
                type="text"
                className="w-full h-[50px] border border-gray-400 rounded-md p-2 text-[14px]"
                placeholder="First Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                type="email"
                className="w-full h-[50px] border border-gray-400 rounded-md p-2 text-[14px]"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="tel"
                className="w-full h-[50px] border border-gray-400 rounded-md p-2 text-[14px]"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
              <input
                type="text"
                className="w-full h-[50px] border border-gray-400 rounded-md p-2 text-[14px]"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
              <div className="flex gap-4">
                <input
                  type="text"
                  className="w-full lg:w-1/2 h-[50px] border border-gray-400 rounded-md p-2 text-[14px]"
                  placeholder="Postal Code"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  required
                />
                <input
                  type="text"
                  className="w-full lg:w-1/2 h-[50px] border border-gray-400 rounded-md p-2 text-[14px]"
                  placeholder="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <select
                  className="w-full h-[50px] p-2 border rounded-md text-[14px]"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  required
                >
                  <option value="">Select State</option>
                  <option value="Sindh">Sindh</option>
                  <option value="Punjab">Punjab</option>
                  <option value="Baluchistan">Baluchistan</option>
                  <option value="KPK">KPK</option>
                </select>
                <input
                  type="text"
                  value="Pakistan"
                  className="w-full h-[50px] p-2 border rounded-md"
                  disabled
                />
              </div>
            </div>

            <ContactInfo />

          </div>

          <div className="lg:w-1/3 xl:w-2/5 border-t lg:border-t-0 lg:border-l pl-0 lg:pl-4">
            <div className="mt-4">
              <h1 className="text-[18px] font-medium text-center mb-4">
                Order Summary
              </h1>
              <div>
                <div className="flex justify-between items-center">
                  <p className="text-[#8D8D8D] font-normal text-[14px]">Subtotal</p>
                  <p className="text-[#8D8D8D] font-normal text-[14px]">₹ {subtotal.toFixed(2)}</p>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <p className="text-[#8D8D8D] font-normal text-[14px]">Delivery/Shipping</p>
                  <p className="text-[#8D8D8D] font-normal text-[14px]">Free</p>
                </div>
                <div className="flex justify-between items-center border-t border-b border-gray-400 mt-4 py-2">
                  <p className="text-black font-medium text-[14px]">Total</p>
                  <p className="text-black font-medium text-[14px]">₹ {subtotal.toFixed(2)}</p>
                </div>
                <p className="text-[8px] font-normal text-[#757575] mt-2">
                  (The total reflects the price of your order, including all duties and taxes)
                </p>
              </div>
            </div>

            <div className="mt-4">
              <h1 className="text-[14px] font-bold text-center">
                Arrives in 5-7 business days
              </h1>
              {items.map((item, index) => (
                <div key={index} className="flex gap-4 mt-4">
                  <Image
                    src={item.image}
                    alt={item.productName}
                    width={100}
                    height={100}
                    className="w-[100px] h-[100px]"
                  />
                  <div>
                    <p className="text-[12px] font-medium">{item.productName}</p>
                    <p className="text-[12px] mt-1">Qty {item.quantity}</p>
                    <p className="text-[12px] font-bold mt-1">{item.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
