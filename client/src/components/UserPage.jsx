import React from 'react';
import { Component } from 'react';


class UserPage extends Component {
    constructor(props){
        super(props)
        this.state = {
            outfits: [],
            dataLoaded: false,
            isFollowing: false, //need to add some backend stuff so that you can tell if you are following
          }
    }

    componentDidMount(){
        if(this.props.otherUser){
            this.getAllOutfits()
        }
    }



    follow = () => {
        fetch(`/api/followerList/follower/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: {
                'followed_id': this.props.user.id,
            },
        }).then(res => res.json())
            .then(res => {
                this.setState({
                    isFollowing: true,
                })
            }).catch(err => console.log(err));
        }

    unFollow = (id) => {
        fetch(`/api/followerList/follower/${id}`, {
            method: 'DELETE',
        })
        .then(res => res.json())
        .then(res => {
            this.state({
                followingLoaded: false
            })
        })
        .then(res => {
            this.getFollowing();
        }).catch(err => console.log(err))
    }

    getAllOutfits = () => {
        fetch('/api/outfits/user', 
        { credentials: 'include' })
            .then(res => res.json())
            .then(res => {
                console.log(res.data.outfits)
                this.setState({
                    outfits : res.data.outfits,
                    dataLoaded: true,
                });
            }).then(res => {
              console.log(this.state.outfits)
            }).catch(err => console.log(err));
    }

    decideWhichToRender = () => {
        if(this.props.otherUser){
            return <div>
                {/* profile picture */}
                <h1>Hello {this.props.user.username}!</h1>
                {/* bio */}
                <button onClick={() => this.follow()}>{this.state.isFollowing ? "Unfollow" : "Follow"}</button>
                {this.state.outfits.map((value, i) => {
                    return <div key={i}> 
                        <p>{value.description}</p>
                        {/* addToCart */}
                    </div>})}
            </div>
        }
        else{
            return <div>
                {/* profile picture */}
                <h1>Hello {this.props.user.username}!</h1>
                {/* bio */}
                {this.props.outfits.map((value, i) => {
                    return <div key={i}> 
                        <p>{value.description}</p> 
                        <button onClick={() => this.props.edit(value)}>edit</button>
                    </div>})}
            </div>
        }
    }

    render(){
        return(
            <div>
                {this.decideWhichToRender()}
            </div>
        )
    }
}

export default UserPage;