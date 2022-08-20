import React from 'react'
import { Routes, Route } from 'react-router-dom'
import App from '../../../App'
import PostList from '../../../feature/post'
import AddPostForm from '../../../feature/post/addPostForm/AddPostForm'
import SinglePostPage from '../../../feature/post/SinglePostPage'
import Layout from '../layout/Layout'

const MainRoute: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<PostList />} />

        <Route path="post">
          <Route index element={<AddPostForm />} />
          <Route path=":postId" element={<SinglePostPage />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default MainRoute
