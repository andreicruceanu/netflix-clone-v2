import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCloseModal } from "../redux/features/infoModal";

export const useCloseInfoModal = (isOpen) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (isOpen) {
      const handleCloseModal = () => dispatch(setCloseModal());
      handleCloseModal();
    }
  }, [isOpen, dispatch]);
};
