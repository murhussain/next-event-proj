import classes from './comment-list.module.css';

function CommentList(props) {

  // initializing kind of contents to be passed in props
  const { items } = props;

  return (
    <ul className={classes.comments}>
      {/* Looping through all available comments */}
      {items.map((item) => (
        <li key={item._id}>
          <p>{item.text}</p>
          <div>
            By <address>{item.name}</address>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default CommentList;