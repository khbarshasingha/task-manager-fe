import axios from "axios";

export interface Task {
    title: string;
    description: string;
    status?: string;
    taskId?: string;
}

// add new task 

export const handleAddTask = async (newTask: Task, tokenfromCookie: string | null, setTasks: React.Dispatch<React.SetStateAction<Task[]>>, setShowForm: React.Dispatch<React.SetStateAction<boolean>>) => {
    try {
        const res = await axios.post(
            `http://localhost:3000/api/tasks`,
            { title: newTask.title, description: newTask.description },
            { headers: { Authorization: `Bearer ${tokenfromCookie}` } }
        );

        setTasks((prevTasks) => [
            ...prevTasks,
            {
                title: res.data.title,
                description: res.data.description,
                status: res.data.status,
                taskId: res.data.taskId
            },
        ]);
    } catch (e) {
        console.log("Error adding task:", e);
    }
    setShowForm(false);
};


//fetch task lists from api

export const getMyTasks = async (tokenfromCookie: string | null, setTasks: React.Dispatch<React.SetStateAction<Task[]>>) => {
    if (!tokenfromCookie) return; // Ensure token is present before making the request

    try {
        const res = await axios.get(`http://localhost:3000/api/tasks`, {
            headers: { Authorization: `Bearer ${tokenfromCookie}` },
        });
        setTasks(res.data);
    } catch (e) {
        console.log("Error fetching tasks:", e);
    }
};


// dlete task

export const handleDeleteTask = async (id: string | undefined, tokenfromCookie: string | null, tasks: Task[], setTasks: React.Dispatch<React.SetStateAction<Task[]>>) => {
    try {
        const res = await axios.delete(`http://localhost:3000/api/tasks/${id}`, {
            headers: { Authorization: `Bearer ${tokenfromCookie}` },
        });

        const updatedTask = tasks;

        setTasks(updatedTask.filter((t) => t.taskId !== id));

    } catch (e) {
        console.log("Error fetching tasks:", e);
    }
}


//update 

export const handleUpdateTask = async (tasks: Task[], tokenfromCookie: string | null, task: Task, setTasks: React.Dispatch<React.SetStateAction<Task[]>>) => {
    try {
        const res = await axios.put(`http://localhost:3000/api/tasks/${task.taskId}`, { title: task.title, description: task.description, status: task.status }, {
            headers: { Authorization: `Bearer ${tokenfromCookie}` },
        });

        let updatedTask: Task[] = [];
        updatedTask = tasks.map(t => {
            if (t.taskId == task.taskId) {
                return { ...t, title: task.title, description: task.description, status: task.status }
            }
            return t
        })
        setTasks(updatedTask)

    } catch (e) {
        console.log("Error fetching tasks:", e);
    }
}