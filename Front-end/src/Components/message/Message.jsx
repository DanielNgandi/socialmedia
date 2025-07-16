import './message.css'

export default function Message({ message, own}) {
  return (
    
      <div className={own ? " message own" : "message" }>
        <div className="messageTop">
            <img className='messageImg' src={message.sender?.avatar || '/assets/person/img1.png'}
          alt="profile"
        />
        <p className="messageText">{message.text}</p>
      </div>
        <div className="messageButtom">
          {new Date(message.createdAt).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        })}
      </div>
      </div>
  )
}
