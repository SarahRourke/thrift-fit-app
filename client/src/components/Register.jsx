import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

class Register extends Component {
    constructor(){
        super();
        this.state = {
            username: '',
            password: '',
            email: '',
            first_name: '',
            last_name: '',
            zip_code: '',
            state: '',
            city: '',
        }
    }

    handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value,
        });
    }

    render(){
        return(
            <>
            <div className="loginlogo">thrift fit</div>
            <div className="loginform">
                <form className="loginform" onSubmit={(e) => this.props.handleRegisterSubmit(e, this.state)}>
                    <input 
                    type='text'
                    name='username'
                    value={this.state.username}
                    placeholder='Username'
                    onChange={this.handleChange} 
                    />

                    <input 
                    type='password'
                    name='password'
                    value={this.state.password}
                    placeholder='Password'
                    onChange={this.handleChange} 
                    />

                    <input 
                    type="email" 
                    name="email" 
                    value={this.state.email} 
                    placeholder="email" 
                    onChange={this.handleChange} 
                    />

                    <input 
                    type="text" 
                    name="first_name" 
                    value={this.state.first_name} 
                    placeholder="First Name" 
                    onChange={this.handleChange} 
                    />

                    <input 
                    type="text" 
                    name="last_name" 
                    value={this.state.last_name} 
                    placeholder="Last Name" 
                    onChange={this.handleChange} 
                    />

                    <input
                    type="text"
                    name="city"
                    value={this.state.city}
                    placeholder="city"
                    onChange={this.handleChange} 
                    />

                    <select name="state" value={this.state.zip_code} onChange={this.handleChange}>
                        <option value="AL">AL</option>
                        <option value="AK">AK</option>
                        <option value="AR">AR</option>	
                        <option value="AZ">AZ</option>
                        <option value="CA">CA</option>
                        <option value="CO">CO</option>
                        <option value="CT">CT</option>
                        <option value="DC">DC</option>
                        <option value="DE">DE</option>
                        <option value="FL">FL</option>
                        <option value="GA">GA</option>
                        <option value="HI">HI</option>
                        <option value="IA">IA</option>	
                        <option value="ID">ID</option>
                        <option value="IL">IL</option>
                        <option value="IN">IN</option>
                        <option value="KS">KS</option>
                        <option value="KY">KY</option>
                        <option value="LA">LA</option>
                        <option value="MA">MA</option>
                        <option value="MD">MD</option>
                        <option value="ME">ME</option>
                        <option value="MI">MI</option>
                        <option value="MN">MN</option>
                        <option value="MO">MO</option>	
                        <option value="MS">MS</option>
                        <option value="MT">MT</option>
                        <option value="NC">NC</option>	
                        <option value="NE">NE</option>
                        <option value="NH">NH</option>
                        <option value="NJ">NJ</option>
                        <option value="NM">NM</option>			
                        <option value="NV">NV</option>
                        <option value="NY">NY</option>
                        <option value="ND">ND</option>
                        <option value="OH">OH</option>
                        <option value="OK">OK</option>
                        <option value="OR">OR</option>
                        <option value="PA">PA</option>
                        <option value="RI">RI</option>
                        <option value="SC">SC</option>
                        <option value="SD">SD</option>
                        <option value="TN">TN</option>
                        <option value="TX">TX</option>
                        <option value="UT">UT</option>
                        <option value="VT">VT</option>
                        <option value="VA">VA</option>
                        <option value="WA">WA</option>
                        <option value="WI">WI</option>	
                        <option value="WV">WV</option>
                        <option value="WY">WY</option>	
                    </select>

                    <input type="text" 
                    name="zip_code" 
                    pattern="[0-9]{5}" 
                    value={this.state.zip_code}
                    placeholder="Zipcode" 
                    onChange={this.handleChange}/>

                    <input type='submit' value='Register!'/>
                </form>
                <Link to="/login">Already have an account?</Link>
            </div>
            </>
        )
    }
}
export default Register;