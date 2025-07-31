import './conversation.css'

export default function Conversation({ user }) {
 if (!user) return null; // Prevent error if undefined
  return (
    <>
      <div className="conversation">
      <img src={
          user?.avatar
            ? `http://localhost:5000${user.avatar}`
            : '/assets/person/defaultAvatar.png'
        }
        alt="Profile" className="conversationImg" />
      <span className="conversationName">{user?.username || 'Unknown User'}</span>
    </div>
    </>
  )
}
