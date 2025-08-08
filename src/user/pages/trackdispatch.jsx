import { Hash } from "lucide-react";
import { useState } from "react";

const TrackDispatch = () => {
  const [formdata, setFormData] = useState("");

  return (
    <>
      <div id="container-fluid" className="container-fluid">
        <div className="input-wrapper">
          <h1>Enter Tracking Id</h1>
          <div className="input-con">
            <span>
              <Hash size={24} />
            </span>
            <input
              name="Id"
              value={formdata}
              type="text"
              placeholder="e.g: trac1039dlojw"
              onChange={(e) => setFormData(e.target.value)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default TrackDispatch;
