import { useState } from "react";
import ImageUploader from "./ImageUploader";
import styles from "./ImageEditor.module.css";

function App() {
  const [requestState, setRequestState] = useState("");

  return (
    <>
      <main className={styles.Wrapper}>
        <ImageUploader title="Upload image" request={setRequestState} />
        {requestState === "loading" && <h3>Loading...</h3>}
      </main>
    </>
  );
}

export default App;
