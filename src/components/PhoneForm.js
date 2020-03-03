import React, { Component } from 'react';

class PhoneForm extends Component{
    render(){
        return(
            <form>
                <input placeholdr="이름" name="name" ></input>
                <input placeholdr="전화번호" name="phone" ></input>
                <button>등록</button>
            </form>
        );
    }
}

export default PhoneForm;