import React, { FC, useEffect, useRef, useState } from 'react'
import { TaskAll } from '../models/models'
import { Check, Edit, Pencil, Trash2 } from 'lucide-react';
import { Draggable } from 'react-beautiful-dnd';
import { setLocalStorageData } from '../helper/Helper';

interface Props {
	task: TaskAll,
	tasks: TaskAll[],
	key: number,
	index: number,
	setAllTask: React.Dispatch<React.SetStateAction<TaskAll[]>>,
	drop: string
}


const SingleTask: FC<Props> = ({ task, tasks, setAllTask, index, drop }) => {

	const [isEdit, setIsEdit] = useState<Boolean>(false);
	const [taskData, setTaskData] = useState(task.task);
	const inputRef = useRef<HTMLInputElement>(null)

	const handleUpdate = (e: React.FormEvent, id: number) => {
		e.preventDefault();
		const data = tasks.map((t) => t.id === id ? { ...t, task: taskData } : t)
		setAllTask(data)
		setLocalStorageData(drop, data)
		setIsEdit(false)
	}

	const handleDelete = (id: number) => {
		const data = tasks.filter(task => task.id !== id)
		setAllTask(data)
		setLocalStorageData(drop, data)

	}
	const handleDone = (id: number) => {
		const data = tasks.map((task) => task.id === id ? { ...task, isDone: !task.isDone } : task)
		setAllTask(data)
		setLocalStorageData(drop, data)
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
						<div className="input-field-style flex-wrap" >

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
								<span className='text-white  flex-wrap'>{task.task}</span>
							)}
						</div>

						<div className='flex'>
							<p className='text-white ml-4 bg-[#121212] p-2 px-4 rounded'>{task.priority}</p>
							<p className='text-white ml-4' onClick={(e) => {
								handleUpdate(e, task.id)
								setIsEdit(!isEdit)
							}}><Pencil /></p>
							<p className='text-white ml-3' onClick={() => { handleDelete(task.id) }}><Trash2 /></p>
							<p className='text-white  ml-3' onClick={() => { handleDone(task.id) }}><Check /></p>
						</div>
					</form>
				</div>
			)}
		</Draggable>

	)
}

export default SingleTask