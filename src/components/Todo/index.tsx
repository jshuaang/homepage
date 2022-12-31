import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { addDoc, collection, db, deleteDoc, doc, getDoc, getDocs, onSnapshot, updateDoc } from '../../config/firebase';

interface EnumTask {
    map(arg0: (task: any) => JSX.Element): import("react").ReactNode;
    [index: number]: { id: any; value: string; isDone: boolean };
}

const Todo = () => {
    const [valueSearch, setValueSearch] = useState<string>()
    const userId = localStorage.getItem('uid')
    const [tasks, setTasks] = useState<EnumTask>([])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => setValueSearch(e.target.value)

    const handleCheck = async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
        if (userId) {
            const docRefTodo = doc(db, `todos/${userId}/todo/${e.target.id}`)
            await updateDoc(docRefTodo, {
                isDone: e.target.checked
            }).then(() => {
                getTasks()
            })
        }
    }

    const handleSubmit = async (e: React.KeyboardEvent<HTMLInputElement>): Promise<void> => {
        if (e.key.toLowerCase() === 'enter' && userId) {
            const value = valueSearch
            const docRef = doc(db, "todos", userId);
            const colRef = collection(docRef, "todo")
            await addDoc(colRef, {
                value: value,
                isDone: false
            }).then(() => {
                setValueSearch('')
                getTasks()
            })
        }
    }

    const handleDelete = async (e: React.MouseEvent<HTMLDivElement>, taskId: string): Promise<void> => {
        const docRefTodo = doc(db, `todos/${userId}/todo/${taskId}`)
        await deleteDoc(docRefTodo).then(() => { getTasks() })
    }

    const getTasks = async () => {
        if (userId) {
            const subColRef = collection(db, "todos", userId, "todo");
            const qSnap = await getDocs(subColRef)
            const data = qSnap.docs.map(d => ({ id: d.id, value: d.data().value, isDone: d.data().isDone }))
            setTasks(data)
        }
    }

    useEffect(() => {
        getTasks()
    }, [])


    return (
        <div className='flex flex-col text-center text-[1.2rem] justify-start p-10 w-[80%] bg-slate-100 bg-opacity-10 rounded-xl space-y-5'>
            <p className='text-[2rem]'>Things to do:</p>
            <div className='w-[50%] mx-auto text-left py-5 px-2 overflow-y-auto flex-1'>
                {tasks.map(task => {
                    return (
                        <div key={task.id} className="flex items-center space-x-5">
                            <input className="h-4 w-4 accent-slate-500 transition duration-200 cursor-pointer" type="checkbox" value="" id={task.id} checked={task.isDone} onChange={handleCheck} />
                            <label className={`cursor-pointer flex-1 ${task.isDone ? 'line-through' : null}`} htmlFor="checkbox">{task.value}</label>
                            <div onClick={(e) => handleDelete(e, task.id)} className='cursor-pointer'>
                                <FontAwesomeIcon icon={faXmark} />
                            </div>
                        </div>
                    )
                })}
            </div>
            <input value={valueSearch} onChange={handleChange} onKeyUp={handleSubmit} autoComplete="off" type="text" name="q" placeholder='New Todo' className='bg-transparent border-[1px] border-b-white outline-none text-[1em] text-center w-[50%] py-1 mx-auto rounded-xl' />
        </div>
    )
}

export default Todo