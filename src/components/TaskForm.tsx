import React, { FC } from 'react'

interface Porps {
	task: string,
	setTask: React.Dispatch<React.SetStateAction<string>>,
	handleChange: (e: React.FormEvent) => void
}


const InputFiled: FC<Porps> = ({ task, setTask, handleChange }) => {
	return (
		<form onSubmit={handleChange} className='mt-4 mb-5'>
			<input value={task} onChange={(e) => setTask(e.target.value)} placeholder='enter task' className='p-3' />
			<button type='submit' className='p-3 bg-black  text-white m-1 rounded' >Add</button>
		</form>
	)
}

export default InputFiled