import React from "react";
import Image from "next/image";
const DialogForContent = () => {
  return (
    <div className="flex flex-col items-start">
      <div>
        <Image
          src="/icon-success.svg"
          alt="success icon"
          width={50}
          height={50}
        />
      </div>
      <h1 className="text-3xl font-extrabold">Thanks for subscribing!</h1>
      <p className="text-sm text-gray-700">
        A confirmation mail has been sent to your email. Please open it and
        click the button inside to confirm the subscription.
      </p>
    </div>
  );
};

export default DialogForContent;
