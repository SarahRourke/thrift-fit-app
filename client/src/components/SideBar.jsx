import React, { Component } from 'react';

import Follows from './Follows';

class SideBar extends Component {
    constructor(props){
        super(props)
        this.state = {
            allFollowers: [],
            allFollowing: [],
            followersLoaded: false,
            followingLoaded: false,
        }
    }

    componentDidMount(){
        this.getFollowers();
        this.getFollowing();
    }

    getFollowers = () => {
        fetch(`/api/followerList/follower/${this.props.user}`)
            .then(res => res.json())
            .then(res => {
                console.log(res)
                this.setState({
                    allFollowers: res.data.followers,
                    followersLoaded: true,
                });
            }).catch(err => console.log(err));
    }

    getFollowing = () => {
        fetch(`/api/followerList/followed/${this.props.user}`)
            .then(res => res.json())
            .then(res => {
                console.log(res.data.followed)
                this.setState({
                    allFollowing: res.data.followed,
                    followingLoaded: true,
                });
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

    render(){
        return(
            <div className='sideBar'>
                {(this.state.followersLoaded) 
                ? <Follows isFollowers={true} follows={this.state.allFollowers} unFollow={this.unFollow}/> 
                : <p>Loading...</p>}

                {(this.state.followingLoaded) 
                ? <Follows isFollowers={false} follows={this.state.allFollowing} unFollow={this.unFollow}/> 
                : <p>Loading...</p>}

            </div>
        )
    }
}

export default SideBar;