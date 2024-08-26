import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const postSlice = createSlice({
  name: "posts",
  initialState: initialState,
  reducers: {
    createPost: (state, action) => {
      const post = Object.assign(action.payload);
      state.push(post);
    },
    updatePost: (state, action) => {
      const { title, slug, content, featuredImg, userId, status } =
        action.payload;
      const matchingUser = state.find((post) => post.userId === userId);

      if(matchingUser) {
        matchingUser.title = title;
        matchingUser.slug = slug,
        matchingUser.content = content;
        matchingUser.featuredImg = featuredImg;
        matchingUser.status = status;
      }
    },
    deletePost: (state, action) => {
      return state.filter((post) => post.userId !== action.payload)
    },
  },
});

export const { createPost, updatePost, deletePost } = postSlice.actions;

export default postSlice.reducer;
