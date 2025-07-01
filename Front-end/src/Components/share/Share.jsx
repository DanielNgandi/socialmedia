import './share.css'
import{PermMedia, Label, Room, EmojiEmotions} from '@mui/icons-material'

export default function Share() {
  return (
    <div className='share'>
        <div className='shareWrapper'>
          <div className="sharetop">
            <img className='shareProfileImg' src="/assets/person/img2.png" alt="" /> 
             <input placeholder="what's in your mind Daniel"
              className='shareInput' />
          </div>
          <hr className='shareHr'/>
          <div className='shareButton'>
            <div className="shareOptions">
                <div className="shareoption">
                    <PermMedia htmlColor='tomato' className='shareIcon'/>
                    <span className='shareOptionText'> Photo or video</span>
                </div>
                <div className="shareoption">
                    <Label htmlColor='blue' className='shareIcon'/>
                    <span className='shareOptionText'> Tags</span>
                </div>
                <div className="shareoption">
                    <Room htmlColor='green' className='shareIcon'/>
                    <span className='shareOptionText'> Location</span>
                </div>
                <div className="shareoption">
                    <EmojiEmotions htmlColor='gold' className='shareIcon'/>
                    <span className='shareOptionText'> Feelings</span>
                </div> 
            </div>
            <button className='sharebutton'>share</button>
          </div>
        </div>
    </div>
  )
}
