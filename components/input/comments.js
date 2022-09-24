import { useEffect, useState, useContext } from 'react';

import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';
import NotificationContext from '../../store/notification-context';

function Comments(props) {
  const { eventId } = props;

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [isFetchingComments, setIsFetchingComments] = useState(false);

  const notificationCtx = useContext(NotificationContext);

  // loading all saved comments
  useEffect(() => {
    if (showComments) {

      setIsFetchingComments(true);

      fetch('/api/comments/' + eventId)
        .then((response) => response.json())
        .then((data) => {
          setComments(data.comments);
          setIsFetchingComments(false);
        });
    }
  }, [showComments]);

  // showing the content of button
  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  // saving comments for a particular event
  function addCommentHandler(commentData) {
    // showing pending notification
    notificationCtx.showNotification({
      title: 'Sending Comments...',
      message: 'Your comment is currently being stored in DB',
      status: 'pending'
    });

    fetch('/api/comments/' + eventId, {
      method: 'POST',
      body: JSON.stringify(commentData),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if(response.ok){
          return response.json();
        }

        // try to return errors returned from server config
        return response.json().then(data => {
          throw new Error(data.message || 'Something went wrong');
        });
      })
      .then((data) => {
        notificationCtx.showNotification({
          title: 'Success',
          message: 'Your comment was saved',
          status: 'success'
        });
      })
      .catch((error) => {
        notificationCtx.showNotification({
          title: 'Error!',
          message: error.message || 'Something went wrong',
          status: 'error'
        });    
      });
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {/* if button clicked then open inputText for saving comments */}
      {showComments && <NewComment onAddComment={addCommentHandler} />}

      {/* if a button clicked then lets all comments be loaded */}
      {showComments && !isFetchingComments && <CommentList items={comments} />}
      {showComments && isFetchingComments && <p> Loading...</p>}
    </section>
  );
}

export default Comments;