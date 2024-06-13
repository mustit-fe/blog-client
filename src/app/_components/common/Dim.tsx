import { AnimatePresence, motion } from 'framer-motion';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  exit: () => void;
}
function Dim({ isOpen, onClose }: Props) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div className="fixed left-0 top-0 w-full h-full bg-black bg-opacity-50 z-50" onClick={onClose} />
      )}
    </AnimatePresence>
  );
}

export default Dim;
