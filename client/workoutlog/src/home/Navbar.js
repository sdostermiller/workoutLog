import React, {useState} from 'react';
import { 
Navbar,
NavbarBrand,
// Collapse,
// NavbarToggler,
Nav,
NavItem,
Button
} from 'reactstrap';
import WorkoutCreate from '../workouts/WorkoutCreate';
import WorkoutEdit from '../workouts/WorkoutEdit';



const Sitebar = (props) => {
//  const [isOpen, setIsOpen] = useState(false);
//  const toggle = () => {
//      let newIsOpen = !isOpen;
//      setIsOpen(newIsOpen);
//  }
return (
    <Navbar color="faded" expand="lg" light expand="md">
        <NavbarBrand href="/">Workout Log</NavbarBrand>

            <Nav className="mr-auto" navbar>
                <NavItem className="logout">
                    <Button onClick={props.clearToken}>Logout</Button> 

                </NavItem>
            </Nav>
  
    </Navbar>
)}

export default Sitebar;