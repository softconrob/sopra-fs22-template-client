import React, {useEffect, useState} from 'react';
import {api, handleError} from 'helpers/api';
import {Spinner} from 'components/ui/Spinner';
import {Button} from 'components/ui/Button';
import {Link, useHistory, useParams} from 'react-router-dom';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import "styles/views/Profile.scss";
import User from 'models/User';
import 'styles/views/Login.scss';


// if (localStorage.getItem('id') === id) {
//             history.push(`/edit/`+id);
//         } else {
//             alert("Can only Edit your own profile");
// add so that you can only edit own profile
// const {id} = useParams();
// 2 input felder bday und username
//wenn leer dann nichts öndern (if)
//wenn weert dann put reuest und cheggen ob möglich
//update button dann zurück zu profile
//einmal back button zu game
//

// const Player = ({user}) => (
//     <div className="player container">
//         <div className="player username">{user.username}  </div>
//         <div className="player username">Birthday: {user.birthday} </div>
//     </div>
// );
//
//
// Player.propTypes = {
//     user: PropTypes.object
// };

//
const FormField = props => {
    return (
        <div className="Update field">
            <label className="update label">
                {props.label}
            </label>
            <input
                className="update input"
                placeholder="enter here.."
                value={props.value}
                onChange={e => props.onChange(e.target.value)}
            />
        </div>
    );
};

FormField.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func
};
//

const Edit = () => {
    // use react-router-dom's hook to access the history
    const history = useHistory();
    const {id} = useParams();
    const [username, setUsername] = useState(null);
    const [birthday, setBirthday] = useState(null);

    // define a state variable (using the state hook).
    // if this variable changes, the component will re-render, but the variable will
    // keep its value throughout render cycles.
    // a component can have as many state variables as you like.
    // more information can be found under https://reactjs.org/docs/hooks-state.html
    const [users, setUsers] = useState(null);

    const doUpdateUsername = async () => {
        try {
            const requestBody = JSON.stringify({id, username});
            const response = await api.post('/users', requestBody);

            // Get the returned user and update a new object.
            const user = new User(response.data);

            // Store the token into the local storage.
            localStorage.setItem('token', user.token);
            localStorage.setItem('id', user.id);

            // Login successfully worked --> navigate to the route /game in the GameRouter
            history.push(`/game`);
        } catch (error) {
            alert(`Something went wrong during the Registration: \n${handleError(error)}`);
        }
    };

    const doUpdateBirthday = async () => {
        try {
            const requestBody = JSON.stringify({id, birthday});
            const response = await api.post('/users', requestBody);

            // Get the returned user and update a new object.
            const user = new User(response.data);

            // Store the token into the local storage.
            localStorage.setItem('token', user.token);
            localStorage.setItem('id', user.id);

            // Login successfully worked --> navigate to the route /game in the GameRouter
            history.push(`/game`);
        } catch (error) {
            alert(`Something went wrong during the Registration: \n${handleError(error)}`);
        }
    };

    const backToGame = async () => {
        history.push(`/game`);}

    const goToEdit = async () => {
        history.push('/edit');}


    // the effect hook can be used to react to change in your component.
    // in this case, the effect hook is only run once, the first time the component is mounted
    // this can be achieved by leaving the second argument an empty array.
    // for more information on the effect hook, please see https://reactjs.org/docs/hooks-effect.html
    // useEffect(() => {
    //     // effect callbacks are synchronous to prevent race conditions. So we put the async function inside:
    //     async function fetchData() {
    //         try {
    //             const response = await api.get('/users');
    //             //const response = await api.get(`/users/${this.props.match.params.id}`);
    //
    //             // delays continuous execution of an async operation for 1 second.
    //             // This is just a fake async call, so that the spinner can be displayed
    //             // feel free to remove it :)
    //             await new Promise(resolve => setTimeout(resolve, 1000));
    //
    //             // Get the returned users and update the state.
    //             setUsers(response.data);
    //
    //             // This is just some data for you to see what is available.
    //             // Feel free to remove it.
    //             console.log('request to:', response.request.responseURL);
    //             console.log('status code:', response.status);
    //             console.log('status text:', response.statusText);
    //             console.log('requested data:', response.data);
    //
    //             // See here to get more data.
    //             console.log(response);
    //         } catch (error) {
    //             console.error(`Something went wrong while fetching the users: \n${handleError(error)}`);
    //             console.error("Details:", error);
    //             alert("Something went wrong while fetching the users! See the console for details.");
    //         }
    //     }
    //
    //     fetchData();
    // }, []);
    //
    // let content = <Spinner/>;
    //
    //
    //
    // if (users) {
    //     content = (
    //         <div className="game">
    //             <ul className="game user-list">
    //                 {users.map(user => (
    //                     <Player user={user} key={user.id}/>
    //                 ))}
    //             </ul>
    //
    //
    //             <Button
    //                 width="100%"
    //                 onClick={() => goToEdit()}
    //             >
    //                 Edit
    //             </Button>
    //             <Button
    //                 width="100%"
    //                 onClick={() => backToGame()}
    //             >
    //                 Back to all User Overview
    //             </Button>
    //         </div>
    //     );
    // }

    return (
        <BaseContainer className="game container">
            <h2>Happy Coding!</h2>
            <p className="game paragraph">
                Visiting User Profile:
            </p>
            {/*{content}*/}
            <div className="Update container">
                <div className="update form">
                    <FormField
                        label="Username"
                        value={username}
                        onChange={un => setUsername(un)}
                    />
                    <FormField
                        label="Birthday"
                        value={birthday}
                        onChange={n => setBirthday(n)}
                    />
                    <div className="update Username button-container">
                        <Button
                            disabled={!username}
                            width="50%"
                            onClick={() => doUpdateUsername()}
                        >
                            Update Username
                        </Button>
                    </div>
                    <div className="update Birthday button-container">
                        <Button
                            disabled={!birthday}
                            width="50%"
                            onClick={() => doUpdateBirthday()}
                        >
                            Login
                        </Button>
                        <Button
                            width="100%"
                            onClick={() => backToGame()}
                        >
                            Back to all User Overview
                        </Button>
                    </div>
                </div>
            </div>
        </BaseContainer>
    );
}



export default Edit;