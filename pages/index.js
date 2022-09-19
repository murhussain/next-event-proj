import { getFeaturedEvents } from '../helper/api-util';
import EventList from '../components/events/event-list';

function HomePage(props) {
  return (
    <div>
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

