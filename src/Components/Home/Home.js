import axios from "axios";
import { useEffect, useRef, useState } from "react";
import classes from './Home.module.css'

const Home = () => {
  const amountInputRef = useRef();
  const descriptionInputRef = useRef();
  const categoryInputRef = useRef();
  const [expenses, setExpenses] = useState([]);
  const [reload, setReload] = useState(true);

  const formSubmitHandler = (event) => {
    event.preventDefault();
    const amount = amountInputRef.current.value;
    const description = descriptionInputRef.current.value;
    const category = categoryInputRef.current.value;

    const token = localStorage.getItem('token')
    const expense = {
      amount,
      description,
      category,
    };
    axios
      .post("http://localhost:5000/expense/add-expense", expense, {headers: {'Authorization': token}})
      .then((res) => {
        console.log(res.data.expenseData);
        setReload(true);

        amountInputRef.current.value = "";
        descriptionInputRef.current.value = "";
        categoryInputRef.current.value = "";
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAllExpenses = () => {
    const token = localStorage.getItem('token')
    axios.get("http://localhost:5000/expense/get-all-expenses", {headers: {'Authorization': token}}).then((res) => {
      console.log(res.data.allExpenses)
      setExpenses(res.data.allExpenses);
      setReload(false);
    }).catch((err) => console.log(err.message));
  };

  const deleteHandler = (id) => {
    axios
      .delete(`http://localhost:5000/expense/delete-expense/${id}`)
      .then((res) => {
        console.log(res);
        setReload(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (reload) {
      getAllExpenses();
    }
  }, [reload]);

  return (
    <div>
      <div className={classes.mainDiv}>
        <h1>Add New Expense</h1>
        <form className={classes.form} onSubmit={formSubmitHandler}>
          <div className={classes.inputDiv}>
            <label>Expense Amount: </label>
            <input type="number" ref={amountInputRef} required />
          </div>
          <div className={classes.inputDiv}>
            <label>Expense Description: </label>
            <input type="text" ref={descriptionInputRef} required />
          </div>
          <div className={classes.inputDiv}>
            <label>Category: </label>
            <select ref={categoryInputRef}>
              <option value="food">Food</option>
              <option value="fuel">Fuel</option>
              <option value="movie">Movie</option>
              <option value="others">Others</option>
            </select>
          </div>
          <button className={classes.btn} type="submit">Add Expense</button>
        </form>
      </div>
      <div>
        <h1 style={{textAlign: 'center'}}>All Expenses</h1>
        {expenses.map((expense) => (
          <div
          className={classes.expenseDiv}
            key={expense.id}
          >
            <p><span>Description: </span>{expense.description}</p>
            <p><span>Amount: </span>{expense.amount}</p>
            <p><span>Category: </span>{expense.category}</p>
            <button className={classes.btn2}
              onClick={() => {
                deleteHandler(expense.id);
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
