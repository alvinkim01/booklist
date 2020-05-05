import React,{Component} from 'react';
import firebase from './Firebase';

class Login extends Component {
    state ={
        username :'',
        password :''
    }

    onChangeHandler =  (e) => {
        const {name,value} = e.target;
        this.setState({
            [name] : value
        })
    }
    onClickHandler =  (e) => {
       e.preventDefault(); 
       firebase.doSignInWithEmailAndPassword(this.state.username,this.state.password)
       .then(r=>{
           this.props.login();
        })
    }

    render(){
        const {username,password} =  this.state;
        return(
            <div>
                <form>
                    <input name="username" value={username} onChange={this.onChangeHandler} />
                    <input name="password" value={password} onChange={this.onChangeHandler} />
                    <button onClick={this.onClickHandler}>로그인</button>
                </form>
            </div>
        )
    }

}

export default Login;