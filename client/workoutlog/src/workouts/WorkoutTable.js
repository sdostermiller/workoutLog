import React, {useState,useEffect} from 'react';
// import React from 'react';
import {Table, Button} from 'reactstrap';
import WorkoutEdit from './WorkoutEdit';


const WorkoutTable = (props) => {

    const [workouts, setWorkouts] = useState([]);

    // const fetchWorkouts = () => {

    //     // const WorkoutTable = (props) => {
    
    //     fetch(`http://localhost:4050/log/all`, {
    //         method: 'GET',
    //         headers: new Headers({
    //             'Content-Type': 'application/json',
    //             'Authorization': props.token
    //         })
    //     })
    //     .then(res => res.json())
    //     .then(json => setWorkouts(json))
    //     .catch(err => console.log(err))
    // }

    // useEffect(() => {
    //     fetchWorkouts();
    // }, [])

    const deleteWorkout = (workout) => {
        fetch(`http://localhost:4050/log/${workout.id}`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': props.token
            })
        })
        .then(() => props.fetchWorkouts())
        .catch(err => console.log(err))
    }

    const workoutMapper = () => {
        return props.workouts.map((workout, index) => {
        return(
            <tr key={index}>
                <th scope="row">{workout.id}</th>
                <td>{workout.result}</td>
                <td>{workout.description}</td>
                <td>{workout.definition}</td>
                <td>
                    <Button color="warning" onClick={() => {WorkoutEdit(workout)}}>Update</Button>
                    <Button color="danger" onClick={() => {deleteWorkout(workout)}}>Delete</Button>
                </td>
            </tr>
        )
    })
}

    return(
        <>
            <h3>Workout History</h3>
            <hr />
            <Table striped>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Result</th>
                        <th>Description</th>
                        <th>Definition</th>
                    </tr>
                </thead>
                <tbody>
                    {workoutMapper()}
                </tbody>
            </Table>
        </>
    )
}

export default WorkoutTable;