import React, {useEffect, useState} from 'react';
import styles from "./FormCRUD.module.scss"
import useInput from "../../hooks/useInput";

import {
  doc,
  onSnapshot,
  updateDoc,
  setDoc,
  deleteDoc,
  collection,
  serverTimestamp,
  getDoc,
  query,
  where,
  orderBy,
  limit,
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
  const [flag, setFlag] = useState(false);

  const arrInputs = [userName, userLastName, userAddress, userEmail];

  const userCollectionRef = collection(db, "users");

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(userCollectionRef);
      setData(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
    }

    getUsers()
      .catch(error => {
        alert("unsuccessful,error" + error);
        console.log(error)
      });

  }, [flag]);

  const createUser = async (e) => {
    e.preventDefault();
    console.log("Вход")

    await addDoc(userCollectionRef, {
      name: userName.value,
      last: userLastName.value,
      address: userAddress.value,
      email: userEmail.value,
    })
      .then((response) => {
        console.log(response)
        // alert("Даные сохранены!");
      })
      .catch(error => {
        alert("unsuccessful,error" + error);
      })

    console.log(`${userName.value} ${userLastName.value} ${userAddress.value} ${userEmail.value}`)
    console.log("Выход")
    setFlag(!flag);
    arrInputs.forEach(input => input.resetField());
  }


  //ONE TIME GET FUNCTION
  // useEffect(() => {
  //   const getSchools = async () => {
  //     setLoading(true);

  //     const querySnapshot = await getDocs(dbRef);
  //     const items = [];

  //     querySnapshot.forEach((doc) => {
  //       items.push(doc.data());
  //     });
  //     setSchools(items);
  //     setLoading(false);
  //   };

  //   try {
  //     getSchools();
  //   } catch (error) {
  //     console.error(error);
  //   }

  //   // eslint-disable-next-line
  // }, []);


  //REALTIME GET FUNCTION
  // useEffect(() => {
  // const q = query(
  //   colletionRef,
  //  where('owner', '==', currentUserId),
  // where('title', '==', 'School1') // does not need index
  //  where('score', '<=', 100) // needs index  https://firebase.google.com/docs/firestore/query-data/indexing?authuser=1&hl=en
  // orderBy('score', 'asc'), // be aware of limitations: https://firebase.google.com/docs/firestore/query-data/order-limit-data#limitations
  // limit(1)
  // );

  //   setLoading(true);
  //   // const unsub = onSnapshot(q, (querySnapshot) => {
  //   const unsub = onSnapshot(colletionRef, (querySnapshot) => {
  //     const items = [];
  //     querySnapshot.forEach((doc) => {
  //       items.push(doc.data());
  //     });
  //     setSchools(items);
  //     setLoading(false);
  //   });
  //   return () => {
  //     unsub();
  //   };
  //
  //   // eslint-disable-next-line
  // }, []);

  // ADD FUNCTION
  // async function addUser() {
  //   const owner = currentUser ? currentUser.uid : 'unknown';
  //   const ownerEmail = currentUser ? currentUser.email : 'unknown';
  //
  //   const newSchool = {
  //     title,
  //     desc,
  //     score: +score,
  //     id: uuidv4(),
  //     owner,
  //     ownerEmail,
  //     createdAt: serverTimestamp(),
  //     lastUpdate: serverTimestamp(),
  //   };
  //
  //   try {
  //     const schoolRef = doc(colletionRef, newSchool.id);
  //     await setDoc(schoolRef, newSchool);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  //DELETE FUNCTION
  // async function deleteSchool(school) {
  //   try {
  //     const schoolRef = doc(colletionRef, school.id);
  //     await deleteDoc(schoolRef, schoolRef);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  // EDIT FUNCTION
  // async function editSchool(school) {
  //   const updatedSchool = {
  //     score: +score,
  //     lastUpdate: serverTimestamp(),
  //   };
  //
  //   try {
  //     const schoolRef = doc(colletionRef, school.id);
  //     updateDoc(schoolRef, updatedSchool);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }


  //INSERT DATA FUNCTION //
  // const handleInsertData = (e) => {
  //   e.preventDefault();

  // set(ref(db, "TheUsers/"),
  //   {
  //     NameOfStd: userName.value + " " + userLastName.value,
  //     userAddress: userAddress.value,
  //     userEmail: userEmail.value,
  //     userGender: userGender.value,
  //   })
  //   .then(() => {
  //     alert("Даные сохранены!");
  //   })
  //   .catch(error => {
  //     alert("unsuccessful,error" + error);
  //   })


  //   setData(`${userName.value} ${userLastName.value} ${userAddress.value} ${userEmail.value} ${userGender.value}`);
  //   // arrInputs.forEach(input => input.resetField());
  // }


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
            <div key={user.id}>
              <p>name: {user.name} {user.last} email: {user.email} address: {user.address}
                <button>update</button>
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