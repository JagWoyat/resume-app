import React from "react";
import ReactDOM from "react-dom/client";
import Root from "./routes/Root/Root";
import CryptoView from "./routes/CryptoView";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import Main from "./routes/Main/Main";
import WeatherView from "./routes/WeatherView";

// import Posts, { loader as postsLoader } from './routes/Posts';
// import NewPost, { action as newPostAction } from './routes/NewPost';
// import PostDetails, { loader as postDetailsLoader } from './routes/PostDetails';
// import RootLayout from './routes/RootLayout';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Main />,
      },
      {
        path: "/crypto-app",
        element: <CryptoView />,
        // loader: postsLoader,
        // children: [
        //   { path: "/crypto-app", element: <Favorites /> },
        //   { path: '/create-post', element: <NewPost />, action: newPostAction },
        //   { path: '/:postId', element: <PostDetails />, loader: postDetailsLoader }
        // ],
      },
      {
        path: "/weather-app",
        element: <WeatherView />,
        // loader: postsLoader,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
