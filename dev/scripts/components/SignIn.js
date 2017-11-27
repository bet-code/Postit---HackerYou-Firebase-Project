import React from 'react';

class SignIn extends React.Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            confirm: '',
            formType: ''
        }
        this.formType = this.formType.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.signIn = this.signIn.bind(this);
        this.createAccount =this.createAccount.bind(this);
    }
    formType(e) {
        e.preventDefault();
        this.setState({
            formType: e.target.className
        });
    }
    handleChange(e) {
        this.setState ({
            [e.target.name]: e.target.value
        })
    }
    signIn(e) {
        e.preventDefault();
        console.log(this.state.email, this.state.password)
        firebase.auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
            .then((data) => {
                console.log(data.user)
            })
        this.setState ({
            formType: ''
        })        
    }
    createAccount(e) {
        e.preventDefault();
        if(this.state.password === this.state.confirm) {
            firebase.auth()
            .createUserWithEmailAndPassword(this.state.email, this.state.password)
                .then((data) =>{
                    console.log(data.user)
                })
            this.setState ({
                formType: ''
            })                  
        }
    }

    render() {
        let formToDisplay = '';

        if (this.state.formType === 'signIn') {
            formToDisplay = (
                <form className="signInForm" onSubmit={this.signIn}>
                    <label htmlFor="email">Email</label>
                    <input type="email" placeholder="email" name="email" onChange={this.handleChange}/>
                    <label htmlFor="password">Password</label>
                    <input type="password" placeholder="password" name="password" onChange={this.handleChange}/>
                    <button>Log In</button>
                </form>
            );//end of formToDisplay 
        } // end of if statement      
        else if(this.state.formType === 'createAccount') {
            formToDisplay = (
                <form className="createAccountForm" onSubmit={this.createAccount}>
                    <label htmlFor="email">Email Address</label>
                    <input type="email" placeholder="email" name="email" onChange={this.handleChange}/>
                    <label htmlFor="password">Password</label>
                    <input type="password" placeholder="password" name="password" onChange={this.handleChange}/>
                    <label htmlFor="confirm">Confirm Password</label>
                    <input type="password" placeholder="confirm" name="confirm"onChange={this.handleChange}/>
                    <button>Create Account</button>
                </form>
            ); //end of formToDisplay
        } // end of else if statement

        return(
            <div className="signInPage">
                <h1>Post-it <span>notes</span></h1>
                <button className="signIn"onClick={this.formType}>Sign In</button>
                <button className="createAccount" onClick={this.formType}>Create Account</button>
                {formToDisplay}
            </div> 
        )
    }
}

export default SignIn;