import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit'

import { sub } from 'date-fns'

import { RootState } from '../../app/store'
import { PostSliceEnum } from '../../utils/enum'

export interface IReaction {
  [name: string]: number
}

export interface InitialStateProps {
  id: number | string
  title: string
  content: string
  userId?: number | string
  date: string
  reactions: IReaction
}

interface IReactionProp {
  postId : number | string,
  reaction : string
}

const initialState: Array<InitialStateProps> = [
  {
    id: 1,
    title: 'Learning Redux Toolkit',
    content: 'I have heared good things',
    date: sub(new Date(), { minutes: 10 }).toISOString(),
    reactions: {
      thumbsUp: 0,
      wow: 0,
      heart: 0,
      rocket: 0,
      coffee: 0,
    },
  },
  {
    id: 2,
    title: 'Slices......',
    content: 'I have heared good things',
    date: sub(new Date(), { minutes: 5 }).toISOString(), //Timestamp string
    reactions: {
      thumbsUp: 0,
      wow: 0,
      heart: 0,
      rocket: 0,
      coffee: 0,
    },
  },
]

const postSlice = createSlice({
  name: PostSliceEnum.POST,
  initialState,
  reducers: {
    postAdded: {
      reducer: (state, action: PayloadAction<InitialStateProps>) => {
        //state update
        state.push(action.payload)
      },
      prepare: (title: string, content: string, userId: string | number) => {
        return {
          payload: {
            //send data updated data to reducer
            id: nanoid(1),
            title,
            content,
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
    reactionAdded: (state, action : PayloadAction<IReactionProp>) => {
      const { postId, reaction } = action.payload

      const existingPost = state.find((post) => post.id === postId)

      if (existingPost) {
        existingPost.reactions[reaction]++
      }
    },
  },
})

export const selectAllPosts = (state: RootState) => state.posts

export const { postAdded, reactionAdded } = postSlice.actions

export default postSlice.reducer
