import Head from 'next/head';

import { getFeaturedEvents } from '../helper/api-util';
import EventList from '../components/events/event-list';
import NewsletterRegistration from '../components/input/newsletter-registration';

function HomePage(props) {
  return (
    <div>
      <Head>
        <title>NextJS Events</title>
        <meta
            name='description'
            content='Find a lot of great events that allow you to evolve....'
        />
      </Head>
      <NewsletterRegistration />
      <EventList items={props.fEvents} />
    </div>
  );
}
export default HomePage;



export async function getStaticProps(context) {
  const featuredEvents = await getFeaturedEvents();

  return{
    props:{
      fEvents: featuredEvents
    },
    revalidate: 1800
  }
}

