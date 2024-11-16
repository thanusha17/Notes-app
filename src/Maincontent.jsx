import { useState,useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './Maincontent.css'
import Searchbar from './Searchbar.jsx'
import Card from './Card.jsx'

export default function Maincontent(){

    let [title,setTitle] = useState("");
    let [content,setContent] = useState("");
    let [info,setInfo] = useState(() => {
        // Load from localStorage if available
        const savedNotes = localStorage.getItem('notes');
        return savedNotes ? JSON.parse(savedNotes) : [];  // Initialize with stored notes or empty array
    });

    let count=info.length;;

    useEffect(() => {
        // Store the current notes in localStorage whenever 'info' changes
        localStorage.setItem('notes', JSON.stringify(info));
    }, [info]);

    let handleTitle = (e)=>{
        setTitle(e.target.value);
    }

    let handleContent = (e)=>{
        setContent(e.target.value);
    }

    let handleClick = ()=>{
        if (!title || !content) return;
        setTitle("");
        setContent("");
        setInfo((currData)=>{
            return [...currData,{head:title,body:content,id:uuidv4(),completed:false}];
        })
    }

    let handleDelete = (id)=>{
        setInfo((currData) => currData.filter((note) => note.id !== id));
    }

    let handleCompleted = (id)=>{
        setInfo((currData) =>
            currData.map((note) =>
                note.id === id ? { ...note, completed: !note.completed } : note
            )
        );
    }

    let handleEdit = (id)=>{
    
            info.map((note) =>
                note.id === id ? (setContent(note.body), setTitle(note.head),handleDelete(id)) : note
            )
    }

    return (
        <>
        <Searchbar></Searchbar>
        <div className="addNote">
            <input placeholder="Add Title" value={title} onChange={handleTitle} id="titleBar"></input>
            <br></br>
            <textarea placeholder="Add content" value={content} onChange={handleContent} id="contentBar"></textarea>
            <br></br>
            <button onClick={handleClick}>Add note</button>
        </div>
        <div className="mainBox">
            {
            info.filter(item => item.head && item.body && item.id).map((i)=>{
                // return <p key={i.id}>{i.head}</p>
                return <Card 
                title={i.head} 
                content={i.body} 
                unique={i.id} 
                isCompleted={i.completed}
                onDelete={handleDelete} 
                onCompleted={handleCompleted} 
                onEdit={handleEdit}
                key={i.id}>
                    
                </Card>
            })
            }
        </div>
        </>
    )
}