import {Table,} from 'reactstrap';

const DisplayWorkouts = props => {

    return(
        <>
            {
                props.workout.map((workout, key) => {
                    return(
                        <tr key={key}>
                            <td>{workout.result}</td>
                            <td>{workout.description}</td>
                            <td>{workout.definition}</td>
                        </tr>
                    )
                })
            }
        </>
    )
}

export default DisplayWorkouts;