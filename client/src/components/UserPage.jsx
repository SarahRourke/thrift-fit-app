import React from 'react';
import { Component } from 'react';

import Outfit from './Outfit'


class UserPage extends Component {
    constructor(props){
        super(props)
        this.state = {
            outfits: [],
            dataLoaded: false,
            isFollowing: false, //need to add some backend stuff so that you can tell if you are following
            followInstance: null,
          }
    }

    componentDidMount(){
        if(this.props.otherUser){
            this.getAllOutfits();
            this.checkFollowing();
        }
    }

    checkFollowing = () => {
        console.log('hello')
        fetch(`/api/followerList/followed/checkFollowed/${this.props.user.id}`, 
        { credentials: 'include' })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                if(res.data.followed.length === 0){
                    this.setState({
                        isFollowing : false,
                        followInstance: null,
                    });
                }
                else if(res.data.followed[0].follow.id === this.props.user.id){
                    this.setState({
                        isFollowing : true,
                        followInstance: res.data.followed[0].followInstance.instance_id,
                    });
                }
            }).then(res => {
              console.log(this.state.isFollowing)
              console.log(this.state.followInstance)
            }).catch(err => {
                console.log(err)});
    }

    follow = () => {
        console.log(this.props.user.id)
        fetch(`/api/followerList/follower/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({'followed_id': this.props.user.id,}),
        }).then(res => res.json())
            .then(res => {
                // this.setState({
                //     isFollowing: true,
                // })
                this.props.updateStateFunction('follow')
                this.checkFollowing();
            }).catch(err => console.log(err));
        }

    unFollow = () => {
        fetch(`/api/followerList/follower/${this.state.followInstance}`, {
            method: 'DELETE',
        })
        .then(res => res.json())
        .then(res => {
            this.setState({
                followingLoaded: false
            })
        })
        .then(res => {
            // this.setState({
            //     isFollowing: false,
            // })
            this.props.updateStateFunction('follow')
            this.checkFollowing();
        }).catch(err => console.log(err))
    }

    getAllOutfits = () => {
        fetch(`/api/outfits/user/${this.props.user.id}`,
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

    handleOnClickAddToCart(outfit_id) {          
        fetch(`/api/shopping-carts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                // user_id: this.state.user,
                shopping_cart_item: outfit_id
            })
        })
    }

    decideWhichToRender = () => {
        if(this.props.otherUser){
            return <div>
                {/* profile picture */}
                <h1>{this.props.user.username}!</h1>

                {/* bio */}

                <button 
                    onClick={this.state.isFollowing ? () => this.unFollow() : () => this.follow()}>
                    {this.state.isFollowing ? "Unfollow" : "Follow"}
                </button>
                <div className="row">
                {this.state.dataLoaded ? this.state.outfits.map((value, i) => {
                    return <Outfit 
                    outfits={value} 
                    key={i} 
                    handleOnClickAddToCart={this.handleOnClickAddToCart}
                    userPage={true}
                    otherUser={true}/>
                
                
                }) : <p>Loading...</p>}
                </div>

            </div>
        }
        else{
            return <div>
                {/* profile picture */}
                <h1>Hello {this.props.user.username}!</h1>
                {/* bio */}
                <div className="row">
                {this.props.outfits.map((value, i) => {
                    return <Outfit 
                    outfits={value} 
                    key={i} 
                    handleOnClickAddToCart={this.handleOnClickAddToCart}
                    userPage={true}
                    otherUser={true}/>})}
                </div>
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
