import React from 'react';
import './Follows.css'

import { Link } from 'react-router-dom';

const Follows = (props) => {
    return(
        <div className="sideBox">
            {(props.follows.length === 0) 
            ?  <p>{(props.isFollowers) ? 'No followers yet!' : 'Not following anyone yet!'}</p> 
            : <div>
                {props.follows.map((value, i) => {
                    return <div key={i} className={(props.isFollowers) ? 'followers' : 'following'}>
                        <p>
                        <Link style={{textDecoration: 'none'}} to={`/user/${value.follow.username}`} 
                        onClick={() => props.otherUserFunction(value.follow.id)}>
                        {value.follow.username}
                        </Link>
                        </p>
                        {(!props.isFollowers) ? <button onClick={() => props.unFollow(value.followInstance.instance_id)}>Unfollow</button> : ''}
                    </div>
                })}                
                </div>}
        </div>
    )
}

export default Follows;