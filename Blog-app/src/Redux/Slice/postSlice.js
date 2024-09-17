import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: []
}

const postSlice = createSlice({
  name: "posts",
  initialState: initialState,
  reducers: {
    createPost: (state, action) => {
      const post = Object.assign(action.payload);
      state.posts.push(post);
    },
    updatePost: (state, action) => {
      const { title, slug, content, featuredImg, status } = action.payload;
      const matchingUser = state.posts.find((post) => post.slug === slug);

      if (matchingUser) {
        matchingUser.title = title;
        matchingUser.slug = slug;
        matchingUser.content = content;
        matchingUser.featuredImg = featuredImg;
        matchingUser.status = status;
      }
    },
    deletePost: (state, action) => {
      return state.posts.filter((post) => post.$id !== action.payload);
    },
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
  },
});

export const {
  createPost,
  updatePost,
  deletePost,
  setPosts,
} = postSlice.actions;

export default postSlice.reducer;
