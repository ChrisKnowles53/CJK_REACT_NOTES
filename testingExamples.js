// screen.debug9() - add notes for this
// screen.logTestingPlaygroundURL() - add notes for this



//HomePage code:
// import CreateEventBtn from './CreateEventBtn/CreateEventBtn';
// import EventCard from './EventCard/EventCard';

// export default function HomePage(props) {
// 	return (
// 		<div>
// 		<CreateEventBtn/>
// 			<EventCard filteredData={props.filteredData} />
// 		</div>
// 	);
// }

//Homepage Test code:
// Import the necessary utilities from the testing library
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // To add extra assertions like toBeInTheDocument

// Import the component that you're going to test
import HomePage from './HomePage';
import { exitCode } from 'process';

// Mock the child components. This is done to isolate the HomePage component for unit testing.
// Here we are returning a dummy component with a test id which we can use to confirm its presence in the HomePage component.

jest.mock('./CreateEventBtn/CreateEventBtn', () => {
    return function DummyCreateEventBtn() {
        return <div data-testid="create-event-btn"></div> // Adding a test id for the dummy component
    }
});

jest.mock('./EventCard/EventCard', () => {
    return function DummyEventCard({filteredData}) {
        return <div data-testid="event-card">{JSON.stringify(filteredData)}</div> // Adding a test id and displaying filteredData as text
    }
});

// This 'describe' function groups together related tests
describe('HomePage', () => {

    // 'it' is a function which is an alias of 'test'. It takes a string and a callback function as arguments.
    // The string describes the test and the callback function contains the test.
    it('renders CreateEventBtn and EventCard components', () => {
        
        // Mock data to pass into the component when we render it
        const mockData = [{id: 1, name: 'Event 1'}]; // Adjust this to match the shape of your data

        // Render the HomePage component with the mockData as prop
        render(<HomePage filteredData={mockData} />);
        
        // Check if the component with test id 'create-event-btn' is present in the document
        // This is essentially checking if the CreateEventBtn component is rendered by the HomePage component
        expect(screen.getByTestId('create-event-btn')).toBeInTheDocument();

        // Check if the component with test id 'event-card' is present in the document
        // This is essentially checking if the EventCard component is rendered by the HomePage component
        expect(screen.getByTestId('event-card')).toBeInTheDocument();

        // Check if the component with test id 'event-card' contains the mockData as text
        // This is essentially checking if the HomePage component is passing down the filteredData prop correctly to the EventCard component
        expect(screen.getByTestId('event-card')).toHaveTextContent(JSON.stringify(mockData));
    });
});

//EVENT CARD CODE:
// import React, {useState} from "react";
// import "./EventCard.css";

// function EventCard(props) {
//   // Define state variable for showing event description
//   const [show, setShow] = useState({});

//   // Define function to handle click event on image
//   function handleClick(eventId) {
//     // Update the show state variable to toggle the description of the clicked event
//     setShow((prevShow) => ({
//       ...prevShow, // copy the previous state object

//       [eventId]: !prevShow[eventId], // toggle the show property of the clicked event id
//     }));
//   }

//   // Render the EventCard component
//   return (
//     <>
//       <div className='EventCardContainer'>
//         {props.filteredData.map((event) => (
//           <div key={event.id}>
//             {/* add click event listener to toggle the description of the clicked event  */}
//             <img
//               className='event-img'
//               onClick={() => handleClick(event.id)}
//               alt='CardImage'
//               src={event.image}
//             />
//             <div className='TextBorder'>
//               <h1>{event.title}</h1>
//               <div className='EventDateAndCity'>
//                 <h3>{event.date}</h3>
//                 <h3>{event.city}</h3>
//               </div>
//               {/* show the description of the clicked event if the show property is true  */}
//               {show[event.id] && (
//                 <div>
//                   <h3>{event.time}</h3>
//                   <div className='EventAddressAndPostcode'>
//                     <h3>{event.firstLineOfAddress}</h3>
//                     <h3>{event.postcode}</h3>
//                   </div>
//                   <p>{event.description}</p>
//                 </div>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>
//     </>
//   );
// }

// export default EventCard;


//EventCard Test code:
//We could write several tests for the EventCard component. Here are three example tests:
// 1) testing the rendering of events
// 2) the toggle functionality
// 3) checking if an event's additional information is hidden by default
// The it function is used to define the test cases, and the expect function is used to define what the test case should check for.

// Import necessary utilities from React and testing library
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

// Import the component to be tested
import EventCard from './EventCard';

// Describe block groups together related tests
describe('EventCard', () => {

  // Mock data to be used in the tests. This represents example events.
  const mockData = [
    // Mock event 1
    {
      id: 1,
      title: 'Event 1',
      image: 'https://via.placeholder.com/150',
      date: '2023-06-12',
      city: 'San Francisco',
      time: '10:00 AM',
      firstLineOfAddress: '123 Fake Street',
      postcode: '94101',
      description: 'This is Event 1',
    },
    // Mock event 2
    {
      id: 2,
      title: 'Event 2',
      image: 'https://via.placeholder.com/150',
      date: '2023-06-13',
      city: 'New York',
      time: '11:00 AM',
      firstLineOfAddress: '456 Fake Avenue',
      postcode: '10001',
      description: 'This is Event 2',
    },
  ];

  // Test case 1: checks if the component renders the events correctly.
  it('renders events', () => {
    // Render the component with mockData as prop
    render(<EventCard filteredData={mockData} />);

    // Expectations: Event 1 and Event 2 should be present in the document.
    expect(screen.getByText('Event 1')).toBeInTheDocument();
    expect(screen.getByText('Event 2')).toBeInTheDocument();
  });

  // Test case 2: checks if clicking on the image toggles the visibility of the additional event information.
  it('toggles event information on click', () => {
    // Render the component with mockData as prop
    render(<EventCard filteredData={mockData} />);

    // Get the first image element in the document and simulate a click event.
    const image = screen.getAllByRole('img')[0];
    fireEvent.click(image);

    // Expectation: The description of Event 1 should be present in the document.
    expect(screen.getByText('This is Event 1')).toBeInTheDocument();
  });

  // Test case 3: checks if the additional event information is hidden by default.
  it('hides event information by default', () => {
    // Render the component with mockData as prop
    render(<EventCard filteredData={mockData} />);

    // Expectations: The descriptions of Event 1 and Event 2 should not be present in the document.
    expect(screen.queryByText('This is Event 1')).toBeNull();
    expect(screen.queryByText('This is Event 2')).toBeNull();
  });
});