import React from "react";
import SoftButton from "components/SoftButton";

const LoadingButton = ({ loading, title, color, action, size }) => {
  return (
    <SoftButton
      variant="gradient"
      color={color ? color : "info"}
      disabled={loading}
      onClick={action}
      size={size ? size : "medium"}
    >
      {loading ? "..." : title}
    </SoftButton>
  );
};

export default LoadingButton;
