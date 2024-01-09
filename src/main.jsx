import React from "react";
import ReactDOM from "react-dom/client";
import Root from "./routes/Root/Root";
import CryptoView from "./routes/CryptoView";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import Main from "./routes/Main/Main";
import WeatherView from "./routes/WeatherView";
import ScrollView from "./routes/ScrollView";
import ImageEditorView from "./routes/ImageEditorView";
import ErrorPage from "./routes/ErrorPage";
import ImageEditedView from "./routes/ImageEditedView";

// import Posts, { loader as postsLoader } from './routes/Posts';
// import NewPost, { action as newPostAction } from './routes/NewPost';
// import PostDetails, { loader as postDetailsLoader } from './routes/PostDetails';
// import RootLayout from './routes/RootLayout';

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//     errorElement: <ErrorPage />,
//   },
//   {
//     path: "response/:filename",
//     element: <Response />,
//   },
// ]);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Main />,
      },
      {
        path: "/crypto-app",
        element: <CryptoView />,
      },
      {
        path: "/weather-app",
        element: <WeatherView />,
      },
      {
        path: "/image-editor",
        element: <ImageEditorView />,
      },
      {
        path: "/image-editor/:path",
        element: <ImageEditedView />,
      },
      {
        path: "/scroll",
        element: <ScrollView />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
