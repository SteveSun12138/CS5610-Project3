import React, { useState, useEffect } from "react";
import "../style/tipBox.css";

function TipBox() {
  const [tip, setTip] = useState("");
  const tipURI = "/api/tip";

  useEffect(() => {
    loadTip();
  }, []);

  async function loadTip() {
    // Load tip from db
    let uri = tipURI;
    const res = await fetch(uri, {
      method: "GET",
      credentials: "include",
    });

    let data = await res.json();
    let userTip = data[0].tip;
    console.log("userTip: ", userTip);
    setTip(userTip);
  }


  let handleChange = (event) => {
    const val = event.target.value;
    setTip(val);
  };

  function saveTip() {
    let uri = tipURI;

    const username = window.localStorage.getItem("name");
    const reqBody = JSON.stringify({
      user: username,
      tip: tip,
    });
    console.log("reqBody: ", reqBody);

    fetch(uri, {
      body: reqBody,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => {
        console.log("save res: ", res);

        return res.text();
      })
      .catch((err) => console.error("Save tip failed." + err));

    alert("You saving tip has been saved in this box!\nCome back and edit at anytime.");
  }

  return (
    <div className="tipBox-wrapper">
      <div className="labelBox">
        <label className="tip-label">Set a Personal Saving Tip</label>
        <div className="bg-grey-light rounded-b-lg saveBtn">
          <button
            className="border border-grey px-2 py-1 rounded hover:bg-grey outline-0 text-grey-darkest mr-1"
            onClick={saveTip}
          >
            <span>Save</span>
          </button>
        </div>
      </div>
      <div className="rounded-lg">
        <label>
          <textarea
            className="outline-0 mt-2 mb-2"
            id="tip-text"
            value={tip}
            onChange={handleChange}
            aria-label="Close"
          >
            placeholder
          </textarea>
        </label>
      </div>
    </div>
  );
}
TipBox.propTypes={};
export default TipBox;
