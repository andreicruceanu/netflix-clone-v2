import { Modal } from "@mui/material";
import React, { useEffect, useState } from "react";

function MoreInfoModal({ open, onClose, mediaId, mediaType }) {
  const [media, setMedia] = useState();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {});

  return <Modal></Modal>;
}

export default MoreInfoModal;
