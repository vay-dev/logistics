import { Hash } from "lucide-react";

const TrackDispatch = () => {
  return (
    <>
      <div id="container-fluid" className="container-fluid">
        <div className="input-wrapper">
          <h1>Enter Tracking Id</h1>
          <div className="input-con">
            <span>
              <Hash size={24} />
            </span>
            <input type="text" placeholder="e.g: trac1039dlojw" />
          </div>
        </div>
      </div>
    </>
  );
};

export default TrackDispatch;
