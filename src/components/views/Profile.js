import React, {useEffect, useState} from 'react';
import {api, handleError} from 'helpers/api';
import {Spinner} from 'components/ui/Spinner';
import {Button} from 'components/ui/Button';
import {Link, useHistory, useParams} from 'react-router-dom';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import "styles/views/Profile.scss";
import User from "../../models/User";

const Player = ({user}, {online_status = user.logged_in.toString()}) => (
    <div className="player container">
        <div className="player username">{user.username}</div>
        <div className="player logged_in">ONLINE: {online_status}</div>
        <div className="player creation_date">Creation Date: {user.creation_date}</div>
        <div className="player birthday">Birthday: {user.birthday}</div>
    </div>
);


Player.propTypes = {
    user: PropTypes.object
};

const Profile = () => {
    // use react-router-dom's hook to access the history
    const history = useHistory();


    // define a state variable (using the state hook).
    // if this variable changes, the component will re-render, but the variable will
    // keep its value throughout render cycles.
    // a component can have as many state variables as you like.
    // more information can be found under https://reactjs.org/docs/hooks-state.html
    const [user, setUser] = useState(null);
    const {id} = useParams();

    const backToGame = async () => {
        history.push('/game');}

    const goToEdit = async () => {
        if (localStorage.getItem('id') === id) {
            history.push(`/edit/`+id);
        } else {
            alert("Can only Edit your own profile");
        }
    }



    // the effect hook can be used to react to change in your component.
    // in this case, the effect hook is only run once, the first time the component is mounted
    // this can be achieved by leaving the second argument an empty array.
    // for more information on the effect hook, please see https://reactjs.org/docs/hooks-effect.html
    useEffect(() => {

        // effect callbacks are synchronous to prevent race conditions. So we put the async function inside:
        async function fetchData() {
            try {
                const response = await api.get('/users/'+id);
                //const response = await api.get(`/users/${this.props.match.params.id}`);

                // delays continuous execution of an async operation for 1 second.
                // This is just a fake async call, so that the spinner can be displayed
                // feel free to remove it :)
                await new Promise(resolve => setTimeout(resolve, 1000));

                // Get the returned users and update the state.
                setUser(response.data);

                // This is just some data for you to see what is available.
                // Feel free to remove it.
                console.log('request to:', response.request.responseURL);
                console.log('status code:', response.status);
                console.log('status text:', response.statusText);
                console.log('requested data:', response.data);

                // See here to get more data.
                console.log(response);
            } catch (error) {
                console.error(`Something went wrong while fetching the users: \n${handleError(error)}`);
                console.error("Details:", error);
                alert("Something went wrong while fetching the users! See the console for details.");
            }
        }

        fetchData();
    }, []);

    let content = <Spinner/>;



    if (user) {
        content = (
            <div className="game">
                <ul className="game user-list">

                        <Player user={user} key={user.id}/>

                </ul>


                <Button
                    width="100%"
                    onClick={() => goToEdit()}
                >
                    Edit
                </Button>
                <Button
                    width="100%"
                    onClick={() => backToGame()}
                >
                    Back
                </Button>
            </div>
        );
    }


    return (
        <BaseContainer className="game container">
            <h2>Happy Coding!</h2>
            <p className="game paragraph">
                Visiting User Profile:
            </p>
            {content}




        </BaseContainer>
    );
}



export default Profile;
