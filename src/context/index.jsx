

//create context
//provide the state to context
//wrap context in root component
//consume the context using useContext

import {createContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

export  const ShoppingCartContext=createContext(null);


function ShoppingCartProvider({children}){

    const [loading, setLoading] = useState(true);
    const [listOfProducts, setListOfProducts] = useState([]);
    const [productDetails, setProductDetails] = useState(null);
    const [cartItems, setCartItems] = useState([]);
    const navigate=useNavigate();

    async function fetchListOfProducts(){
        const apiResponse=await fetch('https://dummyjson.com/products');
        const result=await apiResponse.json();

        console.log(result);

        if(result && result?.products){
            setListOfProducts(result?.products);
            setLoading(false);
        }
    }

    function handleAddToCart(getProductDetails){
        console.log(getProductDetails);

        let copyExistingCartItems=[...cartItems];
        const findIndexOfCurrentItems=copyExistingCartItems.
        findIndex(cartItem=> cartItem.id === getProductDetails.id);
        console.log(findIndexOfCurrentItems);
        if(findIndexOfCurrentItems ===-1){
            copyExistingCartItems.push({
                ...getProductDetails,
                quantity:1,
                totalPrice:getProductDetails.price,
            })
        }else{
            copyExistingCartItems[findIndexOfCurrentItems]=
                {
                    ...copyExistingCartItems[findIndexOfCurrentItems],
                    quantity:copyExistingCartItems[findIndexOfCurrentItems]?.quantity+1,
                    totalPrice:(copyExistingCartItems[findIndexOfCurrentItems]?.quantity+1)*copyExistingCartItems[findIndexOfCurrentItems]?.price,

                }
        }
        console.log(copyExistingCartItems)
        setCartItems(copyExistingCartItems);
        localStorage.setItem('cartItems',JSON.stringify(copyExistingCartItems));
        navigate(`/cart`);
    }

    function handleRemoveFromCart(getProductDetails,isFullyRemovedFromCart){
        let copyExistingCartItems=[...cartItems];
        const findIndexOfCurrentCartItem=copyExistingCartItems.findIndex(item=>item.id=== getProductDetails.id);
        if(isFullyRemovedFromCart){
            copyExistingCartItems.splice(findIndexOfCurrentCartItem,1);
        }
        else{
            copyExistingCartItems[findIndexOfCurrentCartItem]={
                ...copyExistingCartItems[findIndexOfCurrentCartItem],
                quantity:copyExistingCartItems[findIndexOfCurrentCartItem].quantity-1,
                totalPrice:(copyExistingCartItems[findIndexOfCurrentCartItem].quantity-1)*copyExistingCartItems[findIndexOfCurrentCartItem].price,
            }
        }
        localStorage.setItem('cartItems',JSON.stringify(copyExistingCartItems));
        setCartItems(copyExistingCartItems);

    }

    useEffect(() => {
        fetchListOfProducts();
        setCartItems(JSON.parse(localStorage.getItem('cartItems')))
    }, []);

    console.log(cartItems);
    return(
        <ShoppingCartContext.Provider value={{
            listOfProducts,
            loading,
            setLoading,
            productDetails,
            setProductDetails,
            handleAddToCart,
            cartItems,
            handleRemoveFromCart,
        }}>
            {children}
        </ShoppingCartContext.Provider>
    )
}
export default ShoppingCartProvider;