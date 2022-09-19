import { Fragment } from 'react';

import { getAllEvents } from '../../dummy-data';
import EventList from '../../components/events/event-list';
import EventsSearch from '../../components/events/events-search';

function AllEventsPage() {
  const events = getAllEvents();

  return (
    <Fragment>
      <EventsSearch />
      <EventList items={events} />
    </Fragment>
  );
}

export async function getStaticProps(context){
  return{
    props:{
      featuredEvents:[
        
      ]
    }
  }
}

export default AllEventsPage;