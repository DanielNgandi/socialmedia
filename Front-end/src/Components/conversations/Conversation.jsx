import './conversation.css'

export default function Conversation({ user }) {
 if (!user) return null; // Prevent error if undefined
  return (
    <>
      <div className="conversation">
      <img src={user?.avatar || 'assets/person/img1.png'} alt="" className="conversationImg" />
      <span className="conversationName">{user?.username || 'Unknown User'}</span>
    </div>
    </>
  )
}
