import React, { useEffect } from 'react';
import { useState } from 'react';
import { addToDb, getShoppingCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'

const Shop = () => {
    const [products, setProducts] = useState([]);
    // console.log(products)
    const [cart, setCart] = useState([])

    useEffect(() => {
        fetch('products.json')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])
    useEffect(() => {
        const storedCart = getShoppingCart();
        const savedCart = [];
        // step 1: get id of the addeded product
        for (const id in storedCart) {
            // step 2: get the product by using id 
            const addedProduct = products.find(product => product.id === id);
            if (addedProduct) {
                // step 3: add quantity 
                const quantity = storedCart[id];
                addedProduct.quantity = quantity;
                //4. add the added product to the save cart
                savedCart.push(addedProduct);
            }
        }
    //    step-5: set the cart
        setCart(savedCart)
    }, [products])

    const handleAddToCart = (product) => {
        // console.log(product);
        let newCart = [];
        const exists = cart.find(pd => pd.id === product.id);
        if(!exists){
            product.quantity = 1;
            newCart = [...cart, product];
        }
        else{
            exists.quantity = exists.quantity + 1;
            const remaining = cart.filter(pd => pd.id !== product.id);
            newCart = [...remaining, exists];
        }
        setCart(newCart);
        addToDb(product.id);
    }

    return (
        <div className='shop-container'>
            <div className="product-container">
                {
                    products.map(product => <Product
                        key={product.id}
                        product={product}
                        handleAddToCart={handleAddToCart}
                    ></Product>)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}></Cart>
            </div>
        </div>
    );
};

export default Shop;