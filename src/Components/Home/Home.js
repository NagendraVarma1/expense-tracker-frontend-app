import axios from "axios";
import { useEffect, useRef, useState } from "react";

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
    const expense = {
      amount,
      description,
      category,
    };
    axios
      .post("http://localhost:5000/expense/add-expense", expense)
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
    axios.get("http://localhost:5000/expense/get-all-expenses").then((res) => {
      setExpenses(res.data.allExpenses);
      setReload(false);
    });
  };

  useEffect(() => {
    if (reload) {
      getAllExpenses();
    }
  }, [reload]);

  return (
    <div>
      <h1>Add New Expense</h1>
      <form onSubmit={formSubmitHandler}>
        <div>
          <label>Expense Amount </label>
          <input type="number" ref={amountInputRef} required />
        </div>
        <div>
          <label>Expense Description</label>
          <input type="text" ref={descriptionInputRef} required />
        </div>
        <div>
          <label>Category: </label>
          <select ref={categoryInputRef}>
            <option value="food">Food</option>
            <option value="fuel">Fuel</option>
            <option value="movie">Movie</option>
            <option value="others">Others</option>
          </select>
        </div>
        <button type="submit">Add Expense</button>
      </form>
      <div>
        <h1>All Expenses</h1>
        {expenses.map((expense) => (
          <div
            key={expense.id}
            style={{ display: "flex", justifyContent: "space-evenly" }}
          >
            <p>{expense.description}</p>
            <p>{expense.amount}</p>
            <p>{expense.category}</p>
            <button>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
