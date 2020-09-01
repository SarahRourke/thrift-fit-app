import React from 'react';
import './Follows.css'

const Follows = (props) => {
    return(
        <div className="sideBox">
            <h3>{(props.isFollowers) ? 'Followers:' : 'Following:'}</h3>
            {(props.follows.length === 0) 
            ?  <p>{(props.isFollowers) ? 'No followers yet!' : 'Not following anyone yet!'}</p> 
            : <div>
                {props.follows.map((value, i) => {
                    return <div key={i} className={(props.isFollowers) ? 'followers' : 'following'}>
                        <p>{value.follow.username}</p>
                        {(!props.isFollowers) ? <button onClick={() => props.unFollow(value.followInstance.instance_id)}>Unfollow</button> : ''}
                    </div>
                })}                
                </div>}
        </div>
    )
}

export default Follows;