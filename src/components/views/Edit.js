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
        if (localStorage.getItem('id') === id) {
            try {
                const requestBody = JSON.stringify({id, username});
                await api.put('/users/'+id, requestBody);

                // Update successfully worked --> navigate to the route /profile
                history.push(`/game/profile/`+id);
            } catch (error) {
                alert(`Something went wrong during the Username update: \n${handleError(error)}`);
            }
        } else {
             alert("Can only Edit your own profile");}
    };

    const doUpdateBirthday = async () => {
        if (localStorage.getItem('id') === id) {
            try {
                const requestBody = JSON.stringify({id, birthday});
                await api.put('/users/'+id, requestBody);

                // Update successfully worked --> navigate to the route /profile
                history.push(`/game/profile/`+id);
            } catch (error) {
                alert(`Something went wrong during the Birthday update: \n${handleError(error)}`);
            }
        } else {
            alert("Can only Edit your own profile");}
    };

    const backToGame = async () => {
        history.push(`/game`);}


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
                            Update Birthday
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