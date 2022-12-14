import { createAsyncThunk, createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit'

import axios from 'axios'
import { sub } from 'date-fns'

import { RootState } from '../../app/store'
import { PostSliceEnum } from '../../utils/enum'

export interface IReaction {
  [name: string]: number
}

export interface IPost {
  id: number | string
  title: string
  body: string
  userId?: number | string
  date: string
  reactions: IReaction
}

interface IReactionProp {
  postId: number | string
  reaction: string
}

interface InitialStateProps {
  posts: Array<IPost>
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null | string | undefined
}

interface IIntialPost {
  title: string
  body: string
  userId: string | number
}

interface IUpdatePost {
  id: string | number
  title: string
  body: string
  userId: string | number
  reactions: IReaction
}

const initialState: InitialStateProps = {
  posts: [],
  status: 'idle',
  error: null,
}

const POST_URL = 'https://jsonplaceholder.typicode.com/posts'

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  try {
    const response = await axios.get(POST_URL)
    return [...response.data]
  } catch (err: any) {
    return err.message
  }
})

export const addNewPost = createAsyncThunk('posts/addNewPost', async (initialPost: IIntialPost) => {
  try {
    const response = await axios.post(POST_URL, initialPost)
    return response.data
  } catch (err: any) {
    return err.message
  }
})

export const updatePost = createAsyncThunk('posts/updatPost', async (initialPost: IUpdatePost) => {
  const { id } = initialPost
  try {
    const response = await axios.put(`${POST_URL}/${id}`, initialPost)
    return response.data
  } catch (err: any) {
    //return err.message using fake api
    return initialPost
  }
})

export const deletePost = createAsyncThunk('posts/deletePost', async (initialPost: IUpdatePost) => {
  const { id } = initialPost
  try {
    const response = await axios.delete(`${POST_URL}/${id}`)
    if (response.status === 200) return initialPost
    return `${response.status} : ${response.statusText}`
  } catch (err: any) {
    return err.message
  }
})

const postSlice = createSlice({
  name: PostSliceEnum.POST,
  initialState,
  reducers: {
    postAdded: {
      reducer: (state, action: PayloadAction<IPost>) => {
        //state update
        state.posts.push(action.payload)
      },
      prepare: (title: string, body: string, userId: string | number) => {
        return {
          payload: {
            //send data updated data to reducer
            id: nanoid(1),
            title,
            body,
            date: new Date().toISOString(),
            userId,
            reactions: {
              thumbsUp: 0,
              wow: 0,
              heart: 0,
              rocket: 0,
              coffee: 0,
            },
          },
        }
      },
    },
    reactionAdded: (state, action: PayloadAction<IReactionProp>) => {
      const { postId, reaction } = action.payload

      const existingPost = state.posts.find((post) => post.id === postId)

      if (existingPost) {
        existingPost.reactions[reaction]++
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        let min = 1
        const loadedPost = action.payload.map((post: IPost) => {
          post.date = sub(new Date(), { minutes: min++ }).toISOString()
          post.reactions = {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0,
          }
          return post
        })
        state.posts = state.posts.concat(loadedPost)
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        action.payload.userId = action.payload.userId
        action.payload.date = new Date().toISOString()
        action.payload.reaction = {
          thumbsUp: 0,
          wow: 0,
          heart: 0,
          rocket: 0,
          coffee: 0,
        }
        state.posts.push(action.payload)
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        if (!action.payload.id) {
          console.log('update could not complete')
          console.log(action.payload)
          return
        }
        const { id } = action.payload
        action.payload.date = new Date().toISOString()
        const posts = state.posts.filter((post) => post.id !== id)
        state.posts = [...posts, action.payload]
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        if (!action.payload.id) {
          console.log('Delete could not complete')
          console.log(action.payload)
          return
        }
        const { id } = action.payload
        action.payload.date = new Date().toISOString()
        const posts = state.posts.filter((post) => post.id !== id)
        state.posts = posts
      })
  },
})

export const selectAllPosts = (state: RootState) => state.posts.posts

export const getPostsStatus = (state: RootState) => state.posts.status

export const getPostsError = (state: RootState) => state.posts.error

export const selectPostById = (state: RootState, postId: string | number) =>
  state.posts.posts.find((post) => post.id === Number(postId))

export const { postAdded, reactionAdded } = postSlice.actions

export default postSlice.reducer
