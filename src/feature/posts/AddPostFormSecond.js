import { useState } from "react"
import { useDispatch } from "react-redux"
import { postsAdded } from "./postSlice"
import { nanoid } from "@reduxjs/toolkit"

function AddPostFormSecond (){

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [userId, setUserId] = useState('')

    const dispatch = useDispatch()

    const onTitle = (e) => setTitle(e.target.value)
    const onContent = (e) => setContent(e.target.value)
    const onUserId = (e) => setUserId(e.target.value)

    const handleSubmit = () =>{

        if (title && content ){
            dispatch(
                postsAdded({
                    id: nanoid(),
                    title,
                    content
                })
            )
            setTitle('')
            setContent('')
        }
    }



    return (
        <form className="flex flex-col gap-2 items-center mt-10 text-black">
            <input type="text" className="rounded-xl w-80 border border-2 border-blue-300 p-2" value={title} onChange={onTitle} />
            <input type="text" className="rounded-xl w-80 border border-2 border-blue-300 p-2" value={content} onChange={onContent} />
            <button onClick={handleSubmit} type="button" className="rounded-xl w-80 border border-2 border-blue-300 p-2 bg-blue-300 text-white">Send</button>
        </form>
    )
}

export default AddPostFormSecond