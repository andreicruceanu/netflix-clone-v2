import { useRef } from "react";
import { motion } from "framer-motion";
import Portal from "@mui/material/Portal";
import VideoCardPortal from "./VideoCardPortal";
import MotionContainer from "../animate/MotionContainer";
import {
  varZoomIn,
  varZoomInLeft,
  varZoomInRight,
} from "../animate/variants/zoom/ZoomIn";
import { usePortalData } from "../provider/PortalProvider";

export default function VideoPortalContainer() {
  const { miniModalMediaData, anchorElement, mediaTypeData } = usePortalData();
  const container = useRef(null);
  const rect = anchorElement?.getBoundingClientRect();

  const hasToRender = !!miniModalMediaData && !!anchorElement;
  let isFirstElement = false;
  let isLastElement = false;
  let variant = varZoomIn;
  if (hasToRender) {
    const parentElement = anchorElement.closest("swiper-slide-active");
    const nextSiblingOfParentElement = parentElement?.nextElementSibling;
    const previousSiblingOfParentElement =
      parentElement?.previousElementSibling;
    if (
      !previousSiblingOfParentElement?.classList.contains("swiper-slide-active")
    ) {
      isFirstElement = true;
      variant = varZoomInLeft;
    } else if (
      !nextSiblingOfParentElement?.classList.contains("swiper-slide-active")
    ) {
      isLastElement = true;
      variant = varZoomInRight;
    }
  }

  return (
    <>
      {hasToRender && (
        <Portal container={container.current}>
          <VideoCardPortal
            media={miniModalMediaData}
            anchorElement={anchorElement}
            mediaType={mediaTypeData}
          />
        </Portal>
      )}
      <MotionContainer open={hasToRender} initial="initial">
        <motion.div
          ref={container}
          variants={variant}
          style={{
            zIndex: 1,
            position: "absolute",
            display: "inline-block",
            ...(rect && {
              top: rect.top + window.scrollY - 0.75 * rect.height,
              ...(isLastElement
                ? {
                    right: document.documentElement.clientWidth - rect.right,
                  }
                : {
                    left: isFirstElement
                      ? rect.left
                      : rect.left - 0.25 * rect.width,
                  }),
            }),
          }}
        />
      </MotionContainer>
    </>
  );
}
