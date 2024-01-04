import React, { FC, useEffect, useRef, useState } from 'react'
import { TaskAll } from '../models/models'
import { Check, Edit, Pencil, Trash2 } from 'lucide-react';
import { Draggable } from 'react-beautiful-dnd';

interface Props {
	task: TaskAll,
	tasks: TaskAll[],
	key: number,
	index: number,
	setAllTask: React.Dispatch<React.SetStateAction<TaskAll[]>>,
}


const SingleTask: FC<Props> = ({ task, tasks, setAllTask, index }) => {

	const [isEdit, setIsEdit] = useState<Boolean>(false);
	const [taskData, setTaskData] = useState(task.task);
	const inputRef = useRef<HTMLInputElement>(null)

	const handleUpdate = (e: React.FormEvent, id: number) => {
		e.preventDefault();
		setAllTask(tasks.map((t) => t.id === id ? { ...t, task: taskData } : t))
		setIsEdit(false)
	}

	const handleDelete = (id: number) => {
		setAllTask(tasks.filter(task => task.id !== id))
	}
	const handleDone = (id: number) => {
		setAllTask(tasks.map((task) => task.id === id ? { ...task, isDone: !task.isDone } : task))
	}

	useEffect(() => {
		inputRef.current?.focus();
	}, [Edit])


	return (
		<Draggable draggableId={task.id.toString()} index={index}>
			{(provided) => (
				<div className={`w-[100%] bg-black p-4 rounded mt-4 min-h-[50px]`}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					ref={provided.innerRef}
				>
					<form onSubmit={(e) => handleUpdate(e, task.id)} className='flex justify-between w-full pr-1'>
						<div className="input-field-style " >

							{isEdit ? (
								<input
									value={taskData}
									onChange={(e) => setTaskData(e.target.value)}
									ref={inputRef}
									style={{ padding: "5px" }}
								/>
							) : task.isDone ? (
								<s className='text-white'>{task.task}</s>
							) : (
								<span className='text-white'>{task.task}</span>
							)}
						</div>

						<div  className='flex'>

							<p  className='text-white' onClick={(e) => {
								handleUpdate(e, task.id)
								setIsEdit(!isEdit)
							}}><Pencil /></p>
							<p  className='text-white ml-3' onClick={() => { handleDelete(task.id) }}><Trash2 /></p>
							<p className='text-white  ml-3' onClick={() => { handleDone(task.id) }}><Check /></p>
						</div>
					</form>
				</div>
			)}
		</Draggable>

	)
}

export default SingleTask