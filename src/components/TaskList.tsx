import React, { FC, useEffect } from 'react'
import { TaskAll } from '../models/models'
import SingleTask from './TaskItem';
import { Droppable } from 'react-beautiful-dnd';


interface Task {
	tasks: TaskAll[];
	setAllTask: React.Dispatch<React.SetStateAction<TaskAll[]>>;
	completedTask: TaskAll[];
	setCompletedTask: React.Dispatch<React.SetStateAction<TaskAll[]>>;
	activeTasks: TaskAll[];
	setActiveTasks: React.Dispatch<React.SetStateAction<TaskAll[]>>;
}

const TaskList: FC<Task> = ({ tasks, setAllTask, completedTask, setCompletedTask, activeTasks, setActiveTasks }) => {


	return (
		<div>

			<div className='container flex gap-2'>
				<div className='bg-[#4d4d4d]  p-2 w-[40%]  flex-col rounded'>
					<Droppable droppableId="TaskAdded">
						{
							(provided) => (
								<div className='bg-[#4d4d4d] p-2 h-full' ref={provided.innerRef} {...provided.droppableProps}>
									<h1 className='text-white'>Added task</h1>
									{tasks.map((item, index) => (
										<SingleTask task={item} setAllTask={setAllTask} key={item.id} index={index} tasks={tasks} />
									))
									}
									{provided.placeholder}
								</div>
							)
						}
					</Droppable>
				</div>
				<div className='bg-[#4d4d4d] p-2  w-[40%] rounded'>
					<Droppable droppableId="TaskActive">
						{
							(provided) => (
								<div className='bg-[#4d4d4d] p-2  h-full' ref={provided.innerRef} {...provided.droppableProps}>
									<h1 className='text-white'>Started task</h1>
									{activeTasks.map((item, index) => (
										<SingleTask task={item} setAllTask={setActiveTasks} key={item.id} index={index} tasks={activeTasks}  />
									))
									}
									{provided.placeholder}
								</div>
							)
						}
					</Droppable>
				</div>
				<div className='bg-[#4d4d4d] p-2 w-[40%] rounded'>
					<Droppable droppableId="TaskCompleted">
						{
							(provided) => (
								<div className='bg-[#4d4d4d] p-2  h-full' ref={provided.innerRef} {...provided.droppableProps}>
									<h1 className='text-white'>Completed Task</h1>
									{completedTask.map((item, index) => (
										<SingleTask task={item} setAllTask={setCompletedTask} key={item.id} index={index} tasks={completedTask}  />
									))
									}
									{provided.placeholder}
								</div>
							)
						}
					</Droppable>
				</div>


			</div>
		</div>

	)
}

export default TaskList;