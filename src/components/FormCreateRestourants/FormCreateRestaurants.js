import React, {useEffect, useState} from 'react';
import useInput from "../../hooks/useInput";
import {collection, addDoc, doc, getDocs, updateDoc} from "firebase/firestore";
import {db} from "../../firebaseConfig/fireBaseConfig";
import styles from "./FormCreateRestaurants.module.scss";

const FormCreateRestaurants = () => {
  const productTitle = useInput("");
  const productDescription = useInput("");
  const productImage = useInput("");
  const productPrice = useInput("");

  const [userId, setUserId] = useState(null);

  const [data, setData] = useState("");

  const [shouldUpdate, setShouldUpdate] = useState(false);

  const arrInputs = [productTitle, productDescription, productImage, productPrice];

  const collectionRef = collection(db, "restaurants");

  const [count, setCount] = useState(1);

  useEffect(() => {

    setCount(count + 1);
    const getUsers = async () => {
      await getDocs(collectionRef)
        .then(data => {
          setData(data.docs.map((doc) => ({...doc.data(), id:doc.id})));
          console.log("operation UPDATE getUsers: " + count + " count");
          console.log(data);
        })
    }

    getUsers()
      .catch(error => {
        alert("unsuccessful,error" + error);
        console.log(error)
      });
  }, []);

  const createProduct = async (e) => {
    e.preventDefault();

    const restaurantDocRef = doc(db, "restaurants", "burger_king");
    const productsCollectionRef = collection(restaurantDocRef, "products");

    await addDoc(productsCollectionRef, {
      title: productTitle.value,
      description: productDescription.value,
      image: productImage.value,
      price: productPrice.value,
    })
      .then((response) => {
        console.log(response.path);
        setShouldUpdate(!shouldUpdate);
      })
      .catch(error => {
        alert("unsuccessful,error" + error);
      })

    console.log(`title:${productTitle.value} \ndescription:${productDescription.value} \nimage:${productImage.value} \nprice:${productPrice.value}`)
    arrInputs.forEach(input => input.setField(""));
  }

  // const updateUser = async (e) => {
  //   e.preventDefault();
  //   const newFields = {
  //     name: userName.value,
  //     last: userLastName.value,
  //     address: userAddress.value,
  //     email: userEmail.value,
  //   }
  //
  //   try {
  //     const userDoc = doc(db, "users", userId);
  //     await updateDoc(userDoc, newFields)
  //       .then(response => {
  //         console.log(response);
  //         setShouldUpdate(!shouldUpdate);
  //       })
  //   } catch (error) {
  //     alert(error)
  //     console.log(error);
  //   }
  // };

  // const viewUser = (id) => {
  //   const user = data.filter(user => user.id === id)[0];
  //   console.log(user);
  //
  //   userName.setField(user.name);
  //   userLastName.setField(user.last);
  //   userAddress.setField(user.address);
  //   userEmail.setField(user.email);
  //   setUserId(id)
  // }


  return (
    <div className={styles.containerForm}>
      <p className={styles.title}>Example CREATE restaurants</p>

      <div className={styles.wrapForm}>

        <form className={styles.form}>
          <h3>Form for add product</h3>
          <div className={styles.row}>
            <label>Назва продукту (title):
              <input value={productTitle .value} onChange={productTitle .onChange} type={"text"} name={"title"}
                     placeholder={"Enter name of product..."}/>
            </label>
          </div>
          <div className={styles.row}>
            <label>Опис продукту (description):
              <input value={productDescription.value} onChange={productDescription.onChange} type={"text"} name={"description"}
                     placeholder={"Enter description of product..."}/>
            </label>
          </div>
          <div className={styles.row}>
            <label>Шлях розтошування картинки (path: src/assets/...):
              <input value={productImage.value} onChange={productImage.onChange} type={"text"} name={"image"}
                     placeholder={"Enter path image: src/assets/...."}/>
            </label>
          </div>
          <div className={styles.row}>
            <label>Ціна продукту (price):
              <input value={productPrice.value} onChange={productPrice.onChange} type={"number"} name={"price"}
                     placeholder={"Enter price of product..."}/>
            </label>
          </div>

          <hr/>

          <div className={styles.row}>
            <button onClick={(e)=>createProduct(e)} className={styles.btnCreate}>CREATE</button>
          </div>
        </form>

        <div className={styles.users}>
          something
         {/* {data && data.map(user => {*/}
         {/*  return (*/}
         {/*   <div key={user.id} id={user.id}>*/}
         {/*     <p className={styles.user}>*/}
         {/*       <span>name: {user.name} {user.last} email: {user.email} address: {user.address}</span>*/}
         {/*       <span><button onClick={() => {viewUser(user.id)}}>view</button></span>*/}
         {/*     </p>*/}
         {/*     <hr/>*/}
         {/*   </div>*/}
         {/* )*/}
         {/*})}*/}
        </div>

      </div>

    </div>
  );
};

export default FormCreateRestaurants;