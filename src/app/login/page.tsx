// src/app/page.tsx
'use client';

import { useState, useEffect } from 'react';

// Define a type for your task
type Task = {
    id: string;
    text: string;
    createdAt: string;
};

export default function TaskPage() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [taskText, setTaskText] = useState('');

    // Fetch tasks on initial load
    useEffect(() => {
        // Replace this with your actual fetch/API call
        const storedTasks = localStorage.getItem('tasks');
        if (storedTasks) {
            setTasks(JSON.parse(storedTasks));
        }
    }, []);

    // Handle Task Submission
    const handleAddTask = (e: React.FormEvent) => {
        e.preventDefault();
        if (!taskText.trim()) return;

        const newTask: Task = {
            id: crypto.randomUUID(),
            text: taskText,
            createdAt: new Date().toLocaleDateString(),
        };

        const updatedTasks = [...tasks, newTask];
        setTasks(updatedTasks);
        
        // Replace this with your actual database/API save logic
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        
        setTaskText(''); // Clear input
    };

    return (
        <div className="u-max-width-650" style={{ margin: '0 auto', padding: '2rem' }}>
            <section className="card u-margin-32">
                <h2 className="eyebrow-heading-2">Task Manager</h2>

                {/* Task Submission Form */}
                <form onSubmit={handleAddTask} className="u-margin-block-start-16" style={{ display: 'flex', gap: '8px' }}>
                    <input
                        type="text"
                        value={taskText}
                        onChange={(e) => setTaskText(e.target.value)}
                        placeholder="What needs to be done?"
                        className="u-input"
                        style={{ flex: 1, padding: '8px' }}
                    />
                    <button type="submit" className="u-btn" style={{ padding: '8px 16px' }}>
                        Add Task
                    </button>
                </form>

                {/* View Tasks */}
                <ul className="u-margin-block-start-24" style={{ listStyleType: 'none', padding: 0 }}>
                    {tasks.length === 0 ? (
                        <li style={{ padding: '12px', color: '#666' }}>No tasks found. Add one above!</li>
                    ) : (
                        tasks.map((task) => (
                            <li 
                                key={task.id} 
                                style={{
                                    borderBottom: '1px solid #ccc',
                                    padding: '12px 0',
                                    display: 'flex',
                                    justifyContent: 'space-between'
                                }}
                            >
                                <span>{task.text}</span>
                                <small style={{ color: '#888' }}>{task.createdAt}</small>
                            </li>
                        ))
                    )}
                </ul>
            </section>
        </div>
    );
}