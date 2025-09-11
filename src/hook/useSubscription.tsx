import { useState } from "react";
import axios from "axios";
const useSubscription = () => {
  const [isProcessing, setisProcessing] = useState(false);
  const onSubscribe = async () => {
    setisProcessing(true);
    const res = await axios.get("/api/payment");
    if (res.data.status === 200) {
      return (window.location.href = `${res.data.session_url}`);
    }
    setisProcessing(false);
  };
  return { onSubscribe, isProcessing };
};

export default useSubscription;
