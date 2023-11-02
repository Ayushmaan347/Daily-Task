import React, { useState, useEffect } from "react";
import Task from "./Task";

const Home = () => {
    const initialArray = localStorage.getItem("tasks") ? JSON.parse(localStorage.getItem("tasks")) : [];
    const [tasks, setTasks] = useState(initialArray);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const submitHandler = (e) => {
        e.preventDefault();
        const newTasks = [...tasks, { title, description }];
        setTasks(newTasks);
        localStorage.setItem("tasks", JSON.stringify(newTasks));
        setTitle(""); // Reset the title input
        setDescription(""); // Reset the description input
    };

    const deleteTask = (index) => {
        const filteredArr = tasks.filter((val, i) => {
            return i !== index;
        });
        setTasks(filteredArr); // Update tasks after filtering
        localStorage.setItem("tasks", JSON.stringify(filteredArr)); // Update localStorage after deletion
    };

    return (
        <div className="container">
            <h1>DAILY GOALS</h1>
            <form onSubmit={submitHandler}>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                ></textarea>
                <button type="submit">Add</button>
            </form>
            {tasks.map((item, index) => (
                <Task
                    key={index}
                    title={item.title}
                    description={item.description}
                    deleteTask={deleteTask}
                    index={index}
                />
            ))}
        </div>
    );
};

export default Home;
