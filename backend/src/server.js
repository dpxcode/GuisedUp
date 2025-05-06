const express = require('express');
const cors = require('cors');

const app = express();

// Enable CORS for all routes
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:3001'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
}));

app.use(express.json());

// In-memory storage
const products = [
    {
        id: '1',
        name: 'Professional DSLR Camera',
        price: 499.99,
        description: 'High-quality professional DSLR camera with advanced features and 24MP sensor',
        image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    },
    {
        id: '2',
        name: 'Mirrorless Camera Pro',
        price: 699.99,
        description: 'Premium mirrorless camera with 4K video capabilities and fast autofocus',
        image: 'https://images.unsplash.com/photo-1564466809058-bf4114d55352?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    },
    {
        id: '3',
        name: 'Compact Travel Camera',
        price: 299.99,
        description: 'Lightweight and portable camera perfect for travel photography',
        image: 'https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    },
    {
        id: '4',
        name: 'Action Camera 4K',
        price: 199.99,
        description: 'Rugged action camera with 4K video and waterproof design',
        image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    },
    {
        id: '5',
        name: 'Instant Camera',
        price: 149.99,
        description: 'Classic instant camera with modern features and built-in flash',
        image: 'https://images.unsplash.com/photo-1564466809058-bf4114d55352?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    }
];

let cart = { items: [] };
let orders = [];
let wallet = {
    balance: 1000.00, // Starting balance for demo purposes
    transactions: []
};

// Routes
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to GuisedUp Shopping API' });
});

// Product routes
app.get('/products', (req, res) => {
    res.json(products);
});

// Cart routes
app.get('/cart', (req, res) => {
    res.json(cart);
});

app.post('/cart/add', (req, res) => {
    const { productId, quantity = 1 } = req.body;
    const product = products.find(p => p.id === productId);
    
    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }

    const existingItem = cart.items.find(item => item.productId === productId);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.items.push({
            productId,
            quantity,
            name: product.name,
            price: product.price
        });
    }

    res.json(cart);
});

app.post('/cart/remove', (req, res) => {
    const { productId } = req.body;
    cart.items = cart.items.filter(item => item.productId !== productId);
    res.json(cart);
});

app.post('/cart/update', (req, res) => {
    const { productId, quantity } = req.body;
    const product = products.find(p => p.id === productId);
    
    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }

    const existingItem = cart.items.find(item => item.productId === productId);
    if (existingItem) {
        existingItem.quantity = quantity;
    } else {
        cart.items.push({
            productId,
            quantity,
            name: product.name,
            price: product.price
        });
    }

    res.json(cart);
});

// Wallet routes
app.get('/wallet', (req, res) => {
    res.json(wallet);
});

app.post('/wallet/add', (req, res) => {
    const { amount } = req.body;
    if (amount <= 0) {
        return res.status(400).json({ message: 'Amount must be greater than 0' });
    }
    
    wallet.balance += amount;
    wallet.transactions.push({
        type: 'credit',
        amount,
        date: new Date().toISOString(),
        description: 'Added funds to wallet'
    });
    
    res.json(wallet);
});

// Change from POST to GET for validation
app.get('/cart/validate', (req, res) => {
    console.log('Received validation request'); // Debug log
    console.log('Current cart:', cart); // Debug log
    console.log('Current wallet:', wallet); // Debug log
    
    const total = cart.items.reduce((sum, item) => {
        console.log('Calculating total for item:', item); // Debug log
        return sum + (item.price * item.quantity);
    }, 0);
    
    const canCheckout = total <= wallet.balance;
    
    console.log('Validation check:', { // Debug log
        total,
        balance: wallet.balance,
        canCheckout,
        items: cart.items
    });
    
    res.json({
        canCheckout,
        total,
        balance: wallet.balance,
        message: canCheckout ? 'Sufficient balance' : 'Insufficient balance'
    });
});

// Update the checkout route to be more explicit
app.post('/checkout', (req, res) => {
    if (cart.items.length === 0) {
        return res.status(400).json({ 
            message: 'Cart is empty',
            error: 'EMPTY_CART'
        });
    }

    const total = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    if (total > wallet.balance) {
        return res.status(400).json({ 
            message: 'Insufficient funds in wallet',
            error: 'INSUFFICIENT_FUNDS',
            total,
            balance: wallet.balance
        });
    }

    const order = {
        id: Date.now().toString(),
        items: [...cart.items],
        total,
        date: new Date().toISOString(),
        status: 'completed'
    };

    // Deduct from wallet
    wallet.balance -= total;
    wallet.transactions.push({
        type: 'debit',
        amount: total,
        date: new Date().toISOString(),
        description: `Payment for order #${order.id}`
    });

    orders.push(order);
    cart = { items: [] }; // Clear the cart after successful checkout

    res.json({
        message: 'Order placed successfully',
        order,
        wallet
    });
});

app.get('/orders', (req, res) => {
    res.json(orders);
});

const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 