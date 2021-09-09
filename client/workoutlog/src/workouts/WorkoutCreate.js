import React, {useState} from 'react';
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';

const WorkoutCreate = (props) => {
    const [description, setDescription] = useState('');
    const [definition, setDefinition] = useState('');
    const [result, setResult] = useState('');

const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:4050/log/', {
        method: 'POST',
        body: JSON.stringify({description: description, definition: definition, result: result}),
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': props.token
        })
    }) .then((res) => res.json())
    .then((logData) => {
        console.log(logData);
        setDescription('');
        setDefinition('');
        setResult('')
        props.fetchWorkouts();
    }).catch(err => console.log(err))
}

    return(
        <>
        <h5>Log a Workout</h5>
        <Form onSubmit={handleSubmit}>
            <FormGroup>
                <Label htmlFor="description">Workout Description</Label>
                <Input name="description" value={description} onChange={(e) => setDescription(e.target.value)}/>
                <p> </p>
            </FormGroup>
            <FormGroup>
                <Label htmlFor="definition">Definition</Label>
                <Input type="select" name="definition" value={definition} onChange={(e) => setDefinition(e.target.value)}>
                    <option value="Time">Time</option>
                    <option value="Weight">Weight</option>
                    <option value="Distance">Distance</option>
                </Input>
                <p> </p>
            </FormGroup>
            <FormGroup>
                <Label htmlFor="result">Result</Label>
                <Input name="result" valiue={result} onChange={(e) => setResult(e.target.value)}/>
            </FormGroup>
            <p>  </p>
            <Button type="submit">Log</Button>
            <p>  </p>
            <hr></hr>
            <p>  </p>

        </Form>
        </>
    )
}

export default WorkoutCreate;