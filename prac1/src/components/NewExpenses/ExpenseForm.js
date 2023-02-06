import { useState } from "react";

import './ExpenseForm.css'

export const ExpenseForm = () => {
    const [title, setTitle] = useState('')
    const [amount, setAmount] = useState('')
    const [date, setDate] = useState('')

    const titleEventHandler= (e) => {
        setTitle(e.target.value)
    }

    const amountEventHandler = (e) => {
        setAmount(e.target.value)
    }

    const dateEventHandler = (e) => {
        setDate(e.target.value)
    }

    return (
        <form>
            <div className="new-expense__controls">
                <div className="new-expense__control">
                    <label>Title</label>
                    <input type="text" onChange={titleEventHandler}></input>
                </div>
                <div className="new-expense__control">
                    <label>Amount</label>
                    <input type="number" min="0.01" step="0.01" onChange={amountEventHandler}></input>
                </div>
                <div className="new-expense__control">
                    <label>Date</label>
                    <input type="date" min='2019-01-01' max='2022-12-31' onChange={titleEventHandler}></input>
                </div>
            </div>

            <div className="new-expense__actions">
                <button type="submit">Add Expense</button>
            </div>
        </form>
    )
}
