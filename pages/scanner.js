import Link from "next/link";
import React, { useState, useRef } from "react";
import { QrReader } from "react-qr-reader";

export default function Scanner() {

  const [data, setData] = useState("No number");
  return (
    <div>
      <div style={{ width: "40%", height: "40%", margin: "auto" }}>
        <QrReader
          onResult={(result, error) => {
            if (!!result) {
              setData(result?.text);
            }

            if (!!error) {
              console.info(error);
            }
          }
          }
          //this is facing mode : "environment " it will open backcamera of the smartphone and if not found will 
          // open the front camera
          constraints={{ facingMode: "environment" }}
          style={{ width: "20%", height: "20%" }}
        />
        <div style={{ margin: "auto" }}>
          <p>{data}</p>
          <Link href={`/showimage/?id=${data}`}><button>Next</button></Link>
        </div>
      </div>
    </div>
  );

}
