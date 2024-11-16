import './Maincontent.css'

export default function Card({title,content,unique,isCompleted,onDelete,onCompleted,onEdit}){


    return(
              <div className="box">
                <div className="top">
                <h3>{title}</h3>
                <div className="icon">
                <i className="fa-solid fa-pen" onClick={()=>{onEdit(unique)}}></i>
                <i className="fa-solid fa-check" id="correct" onClick={()=>{onCompleted(unique)}}></i>
                <i className="fa-solid fa-trash" onClick={()=>{onDelete(unique)}}></i>
                </div>
                </div>
                <hr />
                <span style={{ textDecoration: isCompleted ? 'line-through' : 'none' }}>
                {content.split('\n').map((line, index) => (
                    <p key={index}>{line}</p>
                ))}
            </span>
         </div>
          
    )
}