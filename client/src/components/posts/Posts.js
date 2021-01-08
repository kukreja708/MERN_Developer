import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { getPosts } from '../../actions/post';
import Spinner from '../layout/Spinner';
import PostForm from './PostForm';
import PostItem from './PostItem';

const Posts = ({ getPosts, post: { posts, loading } }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);
  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-primary'>Posts</h1>
      <p className='lead'>
        <i className='fas fa-user'></i>Welcome to the Community
      </p>

      <PostForm />
      <div className='posts'>
        {posts.map((post) => (
          <PostItem post={post} key={post._id} />
        ))}
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    post: state.post
  };
};

export default connect(mapStateToProps, { getPosts })(Posts);
