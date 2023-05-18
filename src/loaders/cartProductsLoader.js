import { getShoppingCart } from "../utilities/fakedb";

const cartProductsLoader = async() => {
    const storedCart = getShoppingCart();
    const ids= Object.keys(storedCart);
    const loadedProducts = await fetch('http://localhost:5000/productsByIds',{
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(ids)
    });
    const products = await loadedProducts.json();
    
    // if cart data is in database u must use async await


    const savedCart = [];
    // {9b169efb-0966-40f3-b9c2-79b16cb96388: 1, 5db3ee2f-2eb7-4764-942d-894f72198e86: 1}
    console.log(storedCart);
    for(const id in storedCart){
        const addedProduct = products.find(pd => pd._id === id);
        if(addedProduct){
            const quantity = storedCart[id];
            addedProduct.quantity = quantity;
            savedCart.push(addedProduct);
        }
    }
    // console.log(products);
    return savedCart;
    // 2
}

// export {cartProductsLoader};
export default cartProductsLoader;