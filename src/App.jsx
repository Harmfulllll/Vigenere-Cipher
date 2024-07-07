import React, { useRef } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import EncryptionPage from "./components/EncryptionPage/EncryptionPage";
import DecryptionPage from "./components/DecryptionPage/DecryptionPage";
import Button from "@mui/joy/Button";
import ToggleButtonGroup from "@mui/joy/ToggleButtonGroup";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

function App() {
  const [mode, setMode] = React.useState("encrypt");
  const [result, setResult] = React.useState("");
  const ref = useRef(null);

  const copyToClipboard = () => {
    const copy = ref.current;
    copy.select();
    navigator.clipboard.writeText(copy.value);
    toast.success("Copied to clipboard", {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  return (
    <div>
      <Header />
      <div className="main">
        <ToggleButtonGroup
          variant="outlined"
          value={mode}
          exclusive
          className="toggle"
        >
          <Button
            color="primary"
            value="encrypt"
            className="button"
            onClick={() => setMode("encrypt")}
          >
            Encrypt
          </Button>
          <Button
            color="primary"
            value="decrypt"
            className="button"
            onClick={() => setMode("decrypt")}
          >
            Decrypt
          </Button>
        </ToggleButtonGroup>

        {mode === "encrypt" ? (
          <EncryptionPage setResult={setResult} />
        ) : (
          <DecryptionPage setResult={setResult} />
        )}
        <textarea
          ref={ref}
          readOnly
          name=""
          id=""
          value={result}
          placeholder={mode === "encrypt" ? "Encrypted Text" : "Decrypted Text"}
        ></textarea>
        <button className="copy" onClick={copyToClipboard}>
          Copy
        </button>
        <ToastContainer />
      </div>

      <Footer />
    </div>
  );
}

export default App;
