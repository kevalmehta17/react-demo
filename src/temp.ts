// const Product = ({
//   id,
//   name,
//   availableCount,
//   price,
//   orderedQuantity,
//   total,
//   handleAdd,
//   handleMinus
// }) => {
//   return (
//     <tr>
//       <td>{id}</td>
//       <td>{name}</td>
//       <td>{availableCount}</td>
//       <td>₹{price}</td>
//       <td>{orderedQuantity}</td>
//       <td>₹{total}</td>
//       <td>
//         <button onClick={handleAdd} className="actionButton" disabled={orderedQuantity == availableCount}>
//           +
//         </button>
//         <button onClick={handleMinus} className="actionButton" disabled={orderedQuantity <= 0}>-</button>
//       </td>
//     </tr>
//   );
// };

// const Checkout = () => {
//   const [loading, setLoading] = useState(false);
//   const [productData, setProductData] = useState([]);

//   const fetchTheData = async () => {
//     setLoading(true);
//     const response = await getStoreItems();
//     console.log('response', response);
//     const data = response.map((val) => ({ ...val, orderedQuantity: 0 }));
//     setProductData(data);
//     console.log('data', data);
//     setLoading(false);
//     return data;
//   };

//   useEffect(() => {
//     fetchTheData();
//   }, []);

//   const handleAdd = (id) => {
//     console.log("pressed");
//     console.log("id", id)
//     console.log("productData", productData);
//     const newData = productData.map((data) => {
//       if (data.id == id && data.availableCount > data.orderedQuantity) {
//         console.log("inside");
//         return { ...data, orderedQuantity: data.orderedQuantity + 1 };
//       }
//       else{
//         console.log("outside");
//         return data;
//       }
//     });
//     setProductData(newData);
//   };

//   const handleMinus = (id) => {
//     const newData = productData.map((data) => {
//       if(data.id == id && data.orderedQuantity > 0){
//         console.log("inside mminues", data.orderedQuantity)
//         return {...data, orderedQuantity : data.orderedQuantity-1};
//       }else{
//         return data;
//       }
//     })
//     setProductData(newData);
//   }
//   const subTotal = productData.reduce((acc, curr) => acc + curr.price * curr.orderedQuantity , 0).toFixed(2);
//   const gst = subTotal > 1000? (subTotal * 0.18) : 0; 
//   const total = gst + Number(subTotal);

//   return (
//     <div>
//       <header className="header">
//         <h1>My Bajar Shop</h1>
//       </header>
//       <main>
//         {loading ? <LoadingIcon /> : null}
//         <table className="table">
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>Product Name</th>
//               <th>Available</th>
//               <th>Price (₹) </th>
//               <th>Quantity</th>
//               <th>Total</th>
//               <th></th>
//               <th></th>
//             </tr>
//           </thead>
//           <tbody>
//             {/* Products should be rendered here */}
//             {productData?.map((data) => (
//               <Product
//               key={data.id}
//                 id={data.id}
//                 name={data.name}
//                 availableCount={data.availableCount}
//                 price={data.price}
//                 orderedQuantity={data.orderedQuantity}
//                 handleAdd={() => handleAdd(data.id)}
//                 handleMinus={() => handleMinus(data.id)}
//                 total={(data.price * data.orderedQuantity).toFixed(2)}
                
//               />
//             ))}
//           </tbody>
//         </table>
//         <h2>Order Details</h2>
//         <p>GST: ₹ { gst} </p>
//         <p>Total: ₹ {total}</p>
//       </main>
//     </div>
//   );
// };

// export default Checkout;