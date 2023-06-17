import React, {useEffect, useState} from 'react';
import useInput from "../../hooks/useInput";
import {collection, getDocs, doc, updateDoc} from "firebase/firestore";
import {db} from "../../firebaseConfig/fireBaseConfig";
import styles from "./FormUpdate.module.scss";

const FormUpdate = () => {
  const userName = useInput("");
  const userLastName = useInput("");
  const userAddress = useInput("");
  const userEmail = useInput("");

  const [userId, setUserId] = useState(null);

  const [data, setData] = useState("");

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

  const updateUser = async (e) => {
    e.preventDefault();
    const newFields = {
      name: userName.value,
      last: userLastName.value,
      address: userAddress.value,
      email: userEmail.value,
    }

    try {
      const userDoc = doc(db, "users", userId);
      await updateDoc(userDoc, newFields);
    } catch (error) {
      alert(error)
      console.log(error);
    }
  };

  const viewUser = (id) => {
    const user = data.filter(user => user.id === id)[0];
    console.log(user);

    userName.setField(user.name);
    userLastName.setField(user.last);
    userAddress.setField(user.address);
    userEmail.setField(user.email);
    setUserId(id)
  }


  return (
    <div className={styles.containerForm}>
      <p className={styles.title}>Example UPDATE operation</p>

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
            <button onClick={(e)=>updateUser(e)} className={styles.btnSubmit}>UPDATE</button>
          </div>
        </form>

        <div className={styles.users}>{data && data.map(user => {
          return (
            <div key={user.id} id={user.id}>
              <p>name: {user.name} {user.last} email: {user.email} address: {user.address}
                <button onClick={() => {
                  viewUser(user.id)
                }}>view
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

export default FormUpdate;