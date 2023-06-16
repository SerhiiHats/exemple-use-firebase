import React, {useEffect, useState} from 'react';
import styles from "./FormCRUD.module.scss"
import useInput from "../../hooks/useInput";
import {getDatabase, ref, set, child, update, remove} from "firebase/database";
import {db} from "../../firebaseConfig/fireBaseConfig";


const FormCRUD = () => {

  const userName = useInput("");
  const userLastName = useInput("");
  const userAddress = useInput("");
  const userEmail = useInput("");
  const userGender = useInput("Male");

  const [data, setData] = useState(null);
  const arrInputs = [userName, userLastName, userAddress, userEmail, userGender]

useEffect(()=>{

  console.log("Захожу")
  set(ref(db, "TheUsers/"),
    {
      NameOfStd: userName.value + " " + userLastName.value,
      userAddress: userAddress.value,
      userEmail: userEmail.value,
      userGender: userGender.value,
    })
    .then(() => {
      alert("Даные сохранены!");
    })
    .catch(error => {
      alert("unsuccessful,error" + error);
    })
  console.log("выхожу")
},[data])

  //INSERT DATA FUNCTION //
  const handleInsertData = (e) => {
    e.preventDefault();

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


    setData(`${userName.value} ${userLastName.value} ${userAddress.value} ${userEmail.value} ${userGender.value}`);
    // arrInputs.forEach(input => input.resetField());
  }

  const handleSubmitLogout = (e) => {
    e.preventDefault();

  }


  return (
    <div className={styles.containerForm}>
      <p className={styles.isAuth}>Example CRUD operation</p>

      <form className={styles.formAuth}>
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
        <div className={styles.row}>
          <label>Чоловік / Жінка
            <select value={userGender.value} onChange={userGender.onChange}>
              <option value={"Male"}> Male</option>
              <option value={"Female"}> Female</option>
            </select>
          </label>
        </div>
        <hr/>

        <div className={styles.row}>
          <button onClick={(e) => handleInsertData(e)} className={styles.btnSubmit}>INSERT</button>
          <button onClick={(e) => handleInsertData(e)} className={styles.btnSubmit}>SELECT</button>
          <button onClick={(e) => handleInsertData(e)} className={styles.btnSubmit}>UPDATE</button>
          <button onClick={(e) => handleInsertData(e)} className={styles.btnSubmit}>DELETE</button>
        </div>
      </form>

      <p className={styles.isAuth}>{data}</p>

    </div>
  );
};

export default FormCRUD;