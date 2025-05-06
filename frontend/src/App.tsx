import React, { useState, useEffect } from 'react';
import './App.css';

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
}

interface CartItem {
  productId: string;
  quantity: number;
  name: string;
  price: number;
}

interface Cart {
  items: CartItem[];
}

interface Order {
  id: string;
  items: CartItem[];
  total: number;
  date: string;
  status: string;
}

interface Transaction {
  type: 'credit' | 'debit';
  amount: number;
  date: string;
  description: string;
}

interface Wallet {
  balance: number;
  transactions: Transaction[];
}

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<Cart>({ items: [] });
  const [orders, setOrders] = useState<Order[]>([]);
  const [wallet, setWallet] = useState<Wallet>({ 
    balance: 0, 
    transactions: [] 
  });
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [showWallet, setShowWallet] = useState(false);
  const [addAmount, setAddAmount] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [walletError, setWalletError] = useState<string | null>(null);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const [canCheckout, setCanCheckout] = useState(false);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        await Promise.all([
          fetchProducts(),
          fetchOrders(),
          fetchWallet()
        ]);
        await validateCheckout();
      } catch (error) {
        console.error('Error initializing app:', error);
      }
    };
    
    initializeApp();
  }, []);

  const fetchProducts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:8000/products');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Failed to load products. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await fetch('http://localhost:8000/orders');
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const fetchWallet = async () => {
    try {
      const response = await fetch('http://localhost:8000/wallet');
      if (!response.ok) {
        throw new Error('Failed to fetch wallet');
      }
      const data = await response.json();
      setWallet(data);
    } catch (error) {
      console.error('Error fetching wallet:', error);
      setWalletError('Failed to load wallet. Please try again later.');
    }
  };

  const validateCheckout = async () => {
    try {
      console.log('Validating checkout...'); // Debug log
      const response = await fetch('http://localhost:8000/cart/validate', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      console.log('Validation response status:', response.status); // Debug log
      
      if (!response.ok) {
        throw new Error(`Failed to validate checkout: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Validation response data:', data); // Debug log
      
      setCanCheckout(data.canCheckout);
      setCheckoutError(data.canCheckout ? null : `Insufficient funds. Total: $${data.total.toFixed(2)}, Balance: $${data.balance.toFixed(2)}`);
    } catch (error) {
      console.error('Error validating checkout:', error);
      setCheckoutError('Error validating checkout');
    }
  };

  const addToCart = async (productId: string) => {
    try {
      console.log('Adding to cart:', productId); // Debug log
      const response = await fetch('http://localhost:8000/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId, quantity: 1 }),
      });
      const data = await response.json();
      console.log('Cart after adding:', data); // Debug log
      setCart(data);
      await validateCheckout(); // Wait for validation to complete
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const removeFromCart = async (productId: string) => {
    try {
      console.log('Removing from cart:', productId); // Debug log
      const response = await fetch('http://localhost:8000/cart/remove', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId }),
      });
      const data = await response.json();
      console.log('Cart after removing:', data); // Debug log
      setCart(data);
      await validateCheckout(); // Wait for validation to complete
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const updateCartItemQuantity = async (productId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }
    
    try {
      console.log('Updating cart quantity:', { productId, newQuantity }); // Debug log
      const response = await fetch('http://localhost:8000/cart/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId, quantity: newQuantity }),
      });
      const data = await response.json();
      console.log('Cart after updating:', data); // Debug log
      setCart(data);
      await validateCheckout(); // Wait for validation to complete
    } catch (error) {
      console.error('Error updating cart:', error);
    }
  };

  const handleCheckout = async () => {
    if (!canCheckout) {
      setCheckoutError('Insufficient funds in wallet');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const data = await response.json();
      setCart({ items: [] });
      setOrderSuccess(true);
      setWallet(data.wallet);
      setCheckoutError(null);
      fetchOrders();
      validateCheckout();
    } catch (error) {
      console.error('Error during checkout:', error);
      setCheckoutError(error instanceof Error ? error.message : 'Error during checkout');
    }
  };

  const handleAddFunds = async () => {
    const amount = parseFloat(addAmount);
    if (isNaN(amount) || amount <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/wallet/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount }),
      });
      const data = await response.json();
      setWallet(data);
      setAddAmount('');
    } catch (error) {
      console.error('Error adding funds:', error);
    }
  };

  const calculateTotal = () => {
    return cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>GuisedUp Shopping</h1>
        <div className="wallet-section">
          <button 
            onClick={() => setShowWallet(!showWallet)}
            className="wallet-toggle"
          >
            {showWallet ? 'Hide Wallet' : 'Show Wallet'} (${wallet?.balance?.toFixed(2) || '0.00'})
          </button>
          {showWallet && (
            <div className="wallet">
              <h2>Wallet</h2>
              {walletError ? (
                <div className="error">
                  {walletError}
                  <button onClick={fetchWallet} className="retry-btn">Retry</button>
                </div>
              ) : (
                <>
                  <div className="wallet-balance">
                    <h3>Balance: ${wallet?.balance?.toFixed(2) || '0.00'}</h3>
                  </div>
                  <div className="wallet-actions">
                    <div className="wallet-action">
                      <input
                        type="number"
                        value={addAmount}
                        onChange={(e) => setAddAmount(e.target.value)}
                        placeholder="Amount to add"
                        min="0.01"
                        step="0.01"
                      />
                      <button onClick={handleAddFunds}>Add Funds</button>
                    </div>
                  </div>
                  <div className="transactions">
                    <h3>Transaction History</h3>
                    {wallet?.transactions?.map((transaction, index) => (
                      <div key={index} className={`transaction ${transaction.type}`}>
                        <span className="transaction-date">
                          {new Date(transaction.date).toLocaleDateString()}
                        </span>
                        <span className="transaction-description">
                          {transaction.description}
                        </span>
                        <span className="transaction-amount">
                          {transaction.type === 'credit' ? '+' : '-'}${transaction.amount.toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
        <div className="cart">
          <h2>Shopping Cart</h2>
          {cart.items.length === 0 ? (
            <p className="empty-cart">Your cart is empty</p>
          ) : (
            <>
              {cart.items.map((item) => (
                <div key={item.productId} className="cart-item">
                  <div className="cart-item-details">
                    <span className="cart-item-name">{item.name}</span>
                    <span className="cart-item-price">${item.price}</span>
                  </div>
                  <div className="cart-item-controls">
                    <div className="quantity-controls">
                      <button 
                        onClick={() => updateCartItemQuantity(item.productId, item.quantity - 1)}
                        className="quantity-btn"
                      >
                        -
                      </button>
                      <span className="quantity">{item.quantity}</span>
                      <button 
                        onClick={() => updateCartItemQuantity(item.productId, item.quantity + 1)}
                        className="quantity-btn"
                      >
                        +
                      </button>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.productId)}
                      className="remove-btn"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
              <div className="cart-total">
                <h3>Total: ${calculateTotal().toFixed(2)}</h3>
                {checkoutError && (
                  <div className="error">
                    {checkoutError}
                    {checkoutError === 'Insufficient funds in wallet' && (
                      <button onClick={() => setShowWallet(true)} className="retry-btn">
                        Add Funds
                      </button>
                    )}
                  </div>
                )}
                <button 
                  onClick={handleCheckout} 
                  className="checkout-btn"
                  disabled={!canCheckout}
                >
                  {canCheckout ? 'Proceed to Checkout' : 'Insufficient Funds'}
                </button>
              </div>
            </>
          )}
        </div>
        {orderSuccess && (
          <div className="order-success">
            <h2>Order Placed Successfully!</h2>
            <button onClick={() => setOrderSuccess(false)}>Continue Shopping</button>
          </div>
        )}
        <div className="products">
          <h2>Products</h2>
          {isLoading ? (
            <div className="loading">Loading products...</div>
          ) : error ? (
            <div className="error">
              {error}
              <button onClick={fetchProducts} className="retry-btn">Retry</button>
            </div>
          ) : (
            <div className="product-grid">
              {products.map((product) => (
                <div key={product.id} className="product-card">
                  <img src={product.image} alt={product.name} />
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <p className="product-price">${product.price.toFixed(2)}</p>
                  <button 
                    onClick={() => addToCart(product.id)}
                    className="add-to-cart-btn"
                  >
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        {orders.length > 0 && (
          <div className="orders">
            <h2>Order History</h2>
            {orders.map((order) => (
              <div key={order.id} className="order-card">
                <h3>Order #{order.id}</h3>
                <p>Date: {new Date(order.date).toLocaleDateString()}</p>
                <p>Total: ${order.total.toFixed(2)}</p>
                <p>Status: {order.status}</p>
              </div>
            ))}
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
