import React from "react";
import "./EncryptionPage.css";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

function EncryptionPage({ setResult }) {
  const [plainText, setPlainText] = React.useState("");
  const [secretKey, setSecretKey] = React.useState("");

  const handlePlainTextChange = (e) => {
    setPlainText(e.target.value);
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
    if (plainText && secretKey) {
      function generateKey(str, key) {
        let x = str.length;

        for (let i = 0; ; i++) {
          if (x === i) i = 0;
          if (key.length >= str.length) break;
          key += key[i];
        }
        return key;
      }
      function encrypt(str, key) {
        let encrypted_text = "";
        let l = 0;
        for (let i = 0; i < str.length; i++) {
          if (str[i] >= "A" && str[i] <= "Z") {
            let x = (str.charCodeAt(i) + key.charCodeAt(l) + 26) % 26;
            l++;
            x += "A".charCodeAt(0);
            if (str[i] !== plainText[i]) x += 32;
            encrypted_text += String.fromCharCode(x);
          } else encrypted_text += str[i];
        }
        return encrypted_text;
      }

      let str = plainText.toUpperCase();
      let key = secretKey.toUpperCase();

      let secret = generateKey(str, key);
      setResult(encrypt(str, secret));
    } else {
      setResult("");
    }
  }, [plainText, secretKey]);

  return (
    <div className="encryption">
      <input
        type="text"
        id="plain-text"
        placeholder="Enter plain text to encrypt"
        onChange={handlePlainTextChange}
      />
      <input
        type="text"
        id="secret-key"
        placeholder="Enter your secret key"
        onKeyDown={(e) => {
          const regex = /^[a-zA-Z]+$/;
          if (!regex.test(e.key)) {
            e.preventDefault();
            showToastMessage();
          }
        }}
        onChange={handleSecretKeyChange}
      />
      <ToastContainer />
    </div>
  );
}
export default EncryptionPage;
