import './feed.css'
import Share from '../share/Share.jsx'
import Post from '../Post/Post.jsx'
import { posts } from '../../data.js'
export default function Feed() {
  return (
    <div className='feed'>
      <div className="feedWrapper">
        <Share/>
        {posts.map((p)=>(
          <Post key={p.id} Post ={p}/>
        ))}
        
      </div>
    </div>
  )
}
