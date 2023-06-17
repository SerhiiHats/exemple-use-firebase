import React, {useEffect, useState} from 'react';
import styles from "./FormCRUD.module.scss"
import useInput from "../../hooks/useInput";

import {
  doc,
  updateDoc,
  deleteDoc,
  collection,
  getDocs,
  addDoc,
} from "firebase/firestore";
import {db} from "../../firebaseConfig/fireBaseConfig";

const FormCRUD = () => {
  const userName = useInput("");
  const userLastName = useInput("");
  const userAddress = useInput("");
  const userEmail = useInput("");

  const [data, setData] = useState(null);

  const arrInputs = [userName, userLastName, userAddress, userEmail];

  const userCollectionRef = collection(db, "users");

  useEffect(() => {
    const getUsers = async () => {
      await getDocs(userCollectionRef)
        .then(data => {
          setData(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
        })
    }

    getUsers()
      .catch(error => {
        alert("unsuccessful,error" + error);
        console.log(error)
      });

  // }, [userCollectionRef]);
  }, []);

  const createUser = async (e) => {
    e.preventDefault();
    await addDoc(userCollectionRef, {
      name: userName.value,
      last: userLastName.value,
      address: userAddress.value,
      email: userEmail.value,
    })
      .then((response) => {
        console.log(response.path)
      })
      .catch(error => {
        alert("unsuccessful,error" + error);
      })

    console.log(`${userName.value} ${userLastName.value} ${userAddress.value} ${userEmail.value}`)
    arrInputs.forEach(input => input.setField(""));
  }

  const updateUser = async (id, address) => {
    const newFields = {address: "somewhere"}
    try {
      const userDoc = doc(db, "users", id);
      await updateDoc(userDoc, newFields);
    } catch (error) {
      console.log(error);
    }
  };


  const deleteUser = async (id) => {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
  };

  return (
    <div className={styles.containerForm}>
      <p className={styles.title}>Example CRUD operation</p>

      <div className={styles.wrapForm}>

        <form className={styles.form}>
          <h3>Please Authenticate</h3>
          <div className={styles.row}>
            <label>ім'я
              <input value={userName.value} onChange={userName.onChange} type={"text"} name={"name"} id={"name"}
                     placeholder={"Enter your first name..."}/>
            </label>
          </div>
          <div className={styles.row}>
            <label>Прізвище
              <input value={userLastName.value} onChange={userLastName.onChange} type={"text"} name={"lastName"}
                     id={"lastName"}
                     placeholder={"Enter your last name..."}/>
            </label>
          </div>
          <div className={styles.row}>
            <label>Адреса
              <input value={userAddress.value} onChange={userAddress.onChange} type={"text"} name={"address"}
                     id={"address"}
                     placeholder={"Enter your address..."}/>
            </label>
          </div>
          <div className={styles.row}>
            <label>E-mail
              <input value={userEmail.value} onChange={userEmail.onChange} type={"email"} name={"email"} id={"email"}
                     placeholder={"Enter your e-mail..."}/>
            </label>
          </div>

          <hr/>

          <div className={styles.row}>
            <button onClick={(e) => createUser(e)} className={styles.btnSubmit}>CREATE</button>
            <button className={styles.btnSubmit}>SELECT</button>
            <button className={styles.btnSubmit}>UPDATE</button>
            <button className={styles.btnSubmit}>DELETE</button>
          </div>
        </form>

        <div className={styles.users}>{data && data.map(user => {
          return (
            <div key={user.id} id={user.id}>
              <p>name: {user.name} {user.last} email: {user.email} address: {user.address}
                <button onClick={() => {
                  updateUser(user.id, user.address)
                }}>update
                </button>
                <button onClick={() => {
                  deleteUser(user.id)
                }}>delete
                </button>
              </p>
              <hr/>
            </div>
          )
        })}
        </div>

      </div>

    </div>
  );
};

export default FormCRUD;