import ExpenseDate from "./ExpenseDate";
import './ExpenseItem.css'
import Card from '../UI/Card'
import { useState } from "react";

export const ExpenseItem = (props) => {
    const [title, setTitle] = useState(props.title)
    console.log('ExpenseItem evaluated by React')

    const cr = 0
    const clickHandler = (counter) => {
        setTitle(counter + 1);
    }

    return (
        <Card className = "expense-item">
            <ExpenseDate date = {props.date}></ExpenseDate>
            <div className = "expense-item__desc">
                <h2>{title}</h2>
                <div className="expense-item__price">${props.amount}</div>
            </div>
            <button onclick = {clickHandler(cr)}>counter++</button>
        </Card>
    )
}

