import { useEffect, useState } from "react";
import { modalProps } from "../../redux/slices/modalSlice";
import YouTube from "react-youtube";

interface TrailerModalProps extends modalProps {
  trailerId?: string;
}

const TrailerModal = ({ trailerId }: TrailerModalProps) => {
  if (!trailerId) {
    return <p>No trailer available</p>;
  }

  const screenWidth = window.innerWidth > 768 ? window.innerWidth * 0.65 : window.innerWidth * 0.9;
  const videoHeight = Math.round((screenWidth * 9) / 16);

  return <YouTube videoId={trailerId} opts={{ width: screenWidth, height: videoHeight }} />;
};

export default TrailerModal;
