import { Fragment } from 'react';
import Head from 'next/head';

import { getAllEvents } from '../../helper/api-util';
import EventList from '../../components/events/event-list';
import EventsSearch from '../../components/events/events-search';

function AllEventsPage(props) {

  return (
    <Fragment>
      <Head>
        <title>All Events</title>
        <meta
            name='description'
            content='Find a lot of great events that allow you to evolve....'
        />
      </Head>
      <EventsSearch />
      <EventList items={props.AllEvents} />
    </Fragment>
  );
}

export default AllEventsPage;

export async function getStaticProps(context){
  const events = await getAllEvents();

  return{
    props:{
      AllEvents: events
    },
    revalidate: 60
  }
}