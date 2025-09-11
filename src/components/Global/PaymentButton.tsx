import React from "react";
import { Button } from "../ui/button";
import { Loader } from "lucide-react";
import useSubscription from "@/hook/useSubscription";

const PaymentButton = () => {
  const { onSubscribe, isProcessing } = useSubscription();

  return (
    <Button className=" text-sm w-full" onClick={onSubscribe}>
      {isProcessing ? <Loader className=" animate-spin"></Loader> : "Upgrade"}
    </Button>
  );
};

export default PaymentButton;
