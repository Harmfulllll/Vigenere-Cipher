import React from "react";
import "./DecryptionPage.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

function DecryptionPage({ setResult }) {
  const [encryptedText, setencryptedText] = React.useState("");
  const [secretKey, setSecretKey] = React.useState("");

  const handleencryptedTextChange = (e) => {
    setencryptedText(e.target.value);
  };
  const handleSecretKeyChange = (e) => {
    setSecretKey(e.target.value);
  };
  const showToastMessage = () => {
    toast.error("Invalid character !", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  React.useEffect(() => {
    if (encryptedText && secretKey) {
      function generateKey(str, key) {
        let x = str.length;

        for (let i = 0; ; i++) {
          if (x === i) i = 0;
          if (key.length >= str.length) break;
          key += key[i];
        }
        return key;
      }
      function decrypt(str, key) {
        let decrypted_text = "";
        let l = 0;
        for (let i = 0; i < str.length; i++) {
          if (str[i] >= "a" && str[i] <= "z") {
            let x = (str.charCodeAt(i) - key.charCodeAt(l) + 26) % 26;
            l++;
            x += "A".charCodeAt(0);
            if (str[i] === encryptedText[i]) x += 32;
            decrypted_text += String.fromCharCode(x);
          } else decrypted_text += str[i];
        }

        return decrypted_text;
      }

      let str = encryptedText.toLowerCase();
      let key = secretKey.toLowerCase();

      let secret = generateKey(str, key);
      setResult(decrypt(str, secret));
    } else {
      setResult("");
    }
  }, [encryptedText, secretKey]);
  return (
    <div className="decryption">
      <input
        type="text"
        id="encrypted-text"
        placeholder="Enter encrypted text to decrypt"
        onChange={handleencryptedTextChange}
      />
      <input
        type="text"
        id="secret-key"
        placeholder="Enter your secret key"
        onChange={handleSecretKeyChange}
        onKeyDown={(e) => {
          const regex = /^[a-zA-Z]+$/;
          if (!regex.test(e.key)) {
            e.preventDefault();
            showToastMessage();
          }
        }}
      />
      <ToastContainer />
    </div>
  );
}
export default DecryptionPage;
