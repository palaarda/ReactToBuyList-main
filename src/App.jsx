import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./style.css"
import JSConfetti from "js-confetti";
import { ProductInput } from "./Components/ProductInput";
import { ShopSelect } from "./Components/ShopSelect";
import { CategorySelect } from "./Components/CategorySelect";
import { deleteProduct, isProductBought } from "./Functions/EventFunctions";
import { handleButton, handleCategorySelect, handleInput, handleShopSelect } from "./Functions/HandlerFunctions";
import { NewFilteredTable } from "./Components/newFilteredTable";

function App() {
  const [productList,setProductList] = useState([])
  const [product, setProduct] = useState({
    name: "",
    shop: "",
    category: "",
    isBought: false,
    id: nanoid() ,
  });
  console.log(productList)
  const [productLength,setProductLength] = useState() 
  useEffect(()=>{
    setProductLength(productList.length)
    if(productLength > 0 && productLength == productList.length && productList.every((product)=>product.isBought))
  {
    alert("Alışveriş Tamamlandı!")
    setProductLength(0)
    const jsConfetti = new JSConfetti()
    jsConfetti.addConfetti()
  }
  },[productList])
  return (
    <>
    <div className="container list-wrapper">
      <div>
        <h1 className="m-4">Ürün Ekle</h1>
        <div className="gap-3 inputs-wrapper">
        <ProductInput handleInput={(e)=>handleInput(e,product,setProduct)} product={product} />
        <ShopSelect handleShopSelect={(e)=>handleShopSelect(e,product,setProduct)} product={product} />
        <CategorySelect handleCategorySelect={(e)=>handleCategorySelect(e,product,setProduct)} product={product}/>
      <div>
        <button onClick={()=>{handleButton(product,setProduct,productList,setProductList)}} className="CartBtn">
          <span className="IconContainer"> 
          </span>
          <p className="text">Listeye Ekle</p>
        </button>
        </div>
      </div>
    </div>
    <div>
      <div className="filtered-wrapper">
        <NewFilteredTable productList={productList} setProductList={setProductList} isProductBought={(id)=>{isProductBought(id,productList,setProductList)}} deleteProduct={(id)=>deleteProduct(id,productList,setProductList)}/>
      </div>
    </div>
    </div>
    </>
  )
}

export default App
