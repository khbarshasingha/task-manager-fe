"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import styles from "./dashboard.module.scss";
import axios from "axios";
import {
  Task,
  getMyTasks,
  handleAddTask,
  handleDeleteTask,
  handleUpdateTask,
} from "./utils";

const DashboardComponent = () => {
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  const tokenfromCookie =
    typeof window !== "undefined" ? localStorage.getItem("authToken") : null;

  const [showForm, setShowForm] = useState<boolean>(false);

  const [showUpdate, setShowUpdate] = useState<boolean>(false);
  const [newTask, setNewTask] = useState({ title: "", description: "" });

  const [selectedTask, setSelectedTask] = useState<Task>({
    taskId: "",
    title: "",
    description: "",
    status: "",
  });

  // Redirect if user is not authenticated
  useEffect(() => {
    if (!tokenfromCookie) {
      alert("Not an authenticated user. Log in to manage your tasks");
      router.push("/login");
    }
  }, [tokenfromCookie, router]);

  useEffect(() => {
    getMyTasks(tokenfromCookie, setTasks);
  }, []);

  return (
    <div className={styles.dashboard}>
      <div className={styles.dashboard_header}>Welcome to Task Manager</div>
      <div className={styles.dashboard_tasks}>
        {tasks.length == 0 && <div>No tasks found</div>}
        {tasks.map((task, i) => (
          <div key={i} className={styles.taskTile}>
            <div>
              <div>{task.title}</div>
              <div>{task.description}</div>
            </div>
            <div>{task.status}</div>
            <div>
              <button
                onClick={() => {
                  setShowUpdate(true);
                  setSelectedTask(task);
                }}
              >
                Update Task
              </button>
            </div>
            <div>
              <button
                onClick={() => {
                  handleDeleteTask(
                    task.taskId,
                    tokenfromCookie,
                    tasks,
                    setTasks
                  );
                }}
              >
                Delete Task
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.dashboard_addTaskButton}>
        <button
          onClick={() => {
            setShowForm(!showForm);
          }}
        >
          {showForm ? "-" : "+"}
        </button>
      </div>
      {showForm && (
        <div>
          <div className={styles.form_textField}>
            <label>Title </label>
            <input
              value={newTask.title}
              name="title"
              type="text"
              onChange={(e) => {
                setNewTask((prev) => ({
                  ...prev,
                  title: e.target.value,
                }));
              }}
            />
          </div>
          <div className={styles.form_textField}>
            <label>Description </label>
            <input
              value={newTask.description}
              name="description"
              type="text"
              onChange={(e) => {
                setNewTask((prev) => ({
                  ...prev,
                  description: e.target.value,
                }));
              }}
            />
          </div>
          <button
            onClick={() => {
              handleAddTask(newTask, tokenfromCookie, setTasks, setShowForm);
            }}
          >
            Add
          </button>
        </div>
      )}

      {showUpdate && (
        <div>
          <div className={styles.form_textField}>
            <label>Title </label>
            <input
              value={selectedTask.title}
              name="title"
              type="text"
              onChange={(e) => {
                setSelectedTask((prev) => ({
                  ...prev,
                  title: e.target.value,
                }));
              }}
            />
          </div>
          <div className={styles.form_textField}>
            <label>Description </label>
            <input
              value={selectedTask.description}
              name="description"
              type="text"
              onChange={(e) => {
                setSelectedTask((prev) => ({
                  ...prev,
                  description: e.target.value,
                }));
              }}
            />
          </div>

          <div className={styles.form_textField}>
            <label>Status </label>
            <input
              value={selectedTask.status}
              name="status"
              type="text"
              onChange={(e) => {
                setSelectedTask((prev) => ({
                  ...prev,
                  status: e.target.value,
                }));
              }}
            />
            Warning:Status can be either - pending, completed or in progress
          </div>
          <button
            onClick={() => {
              handleUpdateTask(tasks, tokenfromCookie, selectedTask, setTasks);

              setShowUpdate(false);
            }}
          >
            Confirm
          </button>
        </div>
      )}
    </div>
  );
};

export default DashboardComponent;
