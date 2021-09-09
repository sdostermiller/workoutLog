// import React, {useState} from 'react';
// import {Container, Form, FormGroup, Label, Input, Button} from 'reactstrap';


// const Auth = (props) => {
    
//     const [firstName, setFirstName] = useState('');
//     const [lastName, setLastName] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [login, setLogin] = useState(true);

//     const title = () => {
//         return !login ? 'Signup' : 'Login';
//     }

//     const loginToggle = (event) => {
//         event.preventDefault();

//         setLogin(!login);

//         setEmail('');
//         setPassword('');
//         setFirstName('');
//         setLastName('');
//     }

//     const signupFields = () => !login ?
//     (
//         <div>
//             <label htmlFor='firstName'>First Name:</label>
//             <br/>
//             <input type='text' id='firstName' value={firstName}
//                 onChange={(e) => setFirstName(e.target.value)} />
//             <br/>
//             <label htmlFor="lastName"> Last Name:</label>
//             <br/>
//             <input type="text" id="lastName" value={lastName}
//                 onChange={e => setLastName(e.target.value)} />
//         </div>
//     )     
//     : null;

//     const handleSubmit = (event) => {
//         event.preventDefault();

//         let reqBody = login ? 
//         {
            
//                 email: email,
//                 password: password
            
//         } : {
          
//                 firstName: firstName,
//                 lastName: lastName,
//                 email: email,
//                 password: password
            
//         }

//         let url = login ?
//         'http://localhost:4050/user/login' :
//         'http://localhost:4050/user/register';

//         fetch(url, {
//             method: 'POST',
//             body: JSON.stringify(reqBody),
//             headers: new Headers({
//                 'Content-Type' : 'application/json'
//             })
//         })
//         .then(response => response.json())
//         .then(json => { console.log(json)
//             props.updateToken(json.sessionToken)
//         })
//         .catch(err => console.log(err))

//     }

//     return (
//         <Container className="auth-container">
//         <div>
//             <Form>
//                 <h1>{title()}</h1>
//                 {signupFields()}
//                 <br/>
//                 <label htmlFor="email">Email:</label>
//                 <br/>
//                 <input type="text" id="email" value={email} 
//                     onChange={(e) => setEmail(e.target.value)} />
//                 <br/>
//                 <label htmlFor="password">Password:</label>
//                 <br/>
//                 <input type="text" id="password" value={password}
//                     onChange={(e) => setPassword(e.target.value)} />
//                 <br/>
//                 <button onClick={loginToggle}>Login/Signup Toggle</button>
//                 <button type="submit"
//                     onClick={handleSubmit}
//                 >Submit</button>
//             </Form>
//         </div>
//         </Container>
//     )
// }

// export default Auth;



import React from 'react';
import {Container, Row, Col} from 'reactstrap';
import Signup from './Signup';
import Login from './Login';

const Auth = (props) => {
    return(
        <Container className="auth-container">
            <Row>
                <Col md="6">
                    <Signup updateToken={props.updateToken}/>
                </Col>
                <Col md="6" className="login-col">
                    <Login updateToken={props.updateToken} />
                </Col>
            </Row>
        </Container>
    )
}

export default Auth;