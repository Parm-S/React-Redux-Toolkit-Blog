import { useState } from 'react'
import PostList from './feature/post'
import AddPostForm from './feature/post/addPostForm/AddPostForm'

function App() {
  const [count, setCount] = useState(0)

  return (
    <main className="App">
      <AddPostForm />
      <br/>
      <PostList />
    </main>
  )
}

export default App
