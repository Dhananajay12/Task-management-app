import { useEffect, useState } from 'react'
import './App.css'
import InputFiled from './components/TaskForm'
import { TaskAll } from './models/models';
import TaskList from './components/TaskList';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

import { useDispatch } from 'react-redux';
import { getLocalStorageData, setLocalStorageData } from './helper/helper';


function App() {

	const [task, setTask] = useState<string>('');

	const [allTask, setAllTask] = useState<TaskAll[]>([]);
	const [activeTasks, setAciveTasks] = useState<TaskAll[]>([]);
	const [completedTask, setCompletedTask] = useState<TaskAll[]>([]);


	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (task) {
			setAllTask([...allTask, { id: Date.now(), task, isDone: false }])
			setLocalStorageData('TaskAdded', [...allTask, { id: Date.now(), task, isDone: false }])
			setTask('')
		}
	}

	useEffect(() => {
		const storedAllTasks = getLocalStorageData('TaskAdded');
		const storedActiveTasks = getLocalStorageData('TaskActive');
		const storedCompletedTasks = getLocalStorageData('TaskCompleted');

		setAllTask(storedAllTasks ?? []);
		setAciveTasks(storedActiveTasks ?? []);
		setCompletedTask(storedCompletedTasks ?? []);
	}, []);

	const onDragEnd = async (event: DropResult) => {
		const { destination, source } = event;

		if (!destination) return;

		if (destination.droppableId === source.droppableId && destination.index === source.index) return;

		let add, tasks = allTask, completed = completedTask, active = activeTasks;


		if (source.droppableId === "TaskAdded") {
			add = tasks[source.index];
			tasks.splice(source.index, 1);
		} else if (source.droppableId === "TaskActive") {
			add = active[source.index];
			active.splice(source.index, 1);

		} else {
			add = completed[source.index];
			completed.splice(source.index, 1);

		}

		if (destination.droppableId === "TaskAdded") {
			tasks.splice(destination.index, 0, add);

		} else if (destination.droppableId === "TaskActive") {
			active.splice(destination.index, 0, add);
		} else {
			completed.splice(destination.index, 0, add);
		}

		setCompletedTask(completed)
		setAllTask(tasks)
		setAciveTasks(active)

		setLocalStorageData('TaskAdded', tasks)
		setLocalStorageData('TaskActive', active)
		setLocalStorageData('TaskCompleted', completed)

	}


	return (
		<>
			<DragDropContext onDragEnd={onDragEnd} >

				<div className=''>
					<h1 className='text-white text-3xl'>Task Management</h1>
					<InputFiled task={task} setTask={setTask} handleChange={handleSubmit} />
					<TaskList
						tasks={allTask}
						setAllTask={setAllTask}
						completedTask={completedTask}
						setCompletedTask={setCompletedTask}
						activeTasks={activeTasks}
						setActiveTasks={setAciveTasks}
					/>
				</div>

			</DragDropContext>
		</>
	)
}

export default App
