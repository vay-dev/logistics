import { Hash, Loader2 } from "lucide-react"; // Spinner from lucide
import { useState } from "react";
import { toast } from "react-toastify"; // Make sure react-toastify is installed

const TrackDispatch = () => {
  const [formdata, setFormData] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleTrack = async () => {
    if (!formdata.trim()) {
      toast.error("Please enter a tracking ID.");
      return;
    }

    setIsLoading(true);
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(
        `https://electronic-gertrudis-chanel-debb-bad97784.koyeb.app/dispatches/${formdata}/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) {
        throw new Error("Tracking ID not found.");
      }

      const data = await res.json();
      console.log("Tracking result:", data);

      toast.success(`Status: ${data.status || "Unknown"}`);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

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
          <button id="button" onClick={handleTrack} disabled={isLoading}>
            {isLoading ? (
              <Loader2 size={24} className="spin inline-block" />
            ) : (
              "Track"
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default TrackDispatch;
