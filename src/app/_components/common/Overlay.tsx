import { AnimatePresence, Variants, motion } from 'framer-motion';
import { ReactNode } from 'react';

const overlayVariants: Variants = {
  initial: {
    opacity: 0,
    scale: 0.7,
    left: '50%',
    top: '50%',
    translateX: '-50%',
    translateY: '-50%',
  },
  animate: {
    opacity: 1,
    scale: 1,
    left: '50%',
    top: '50%',
    translateX: '-50%',
    translateY: '-50%',
  },
  exit: () => ({
    opacity: 0,
    scale: 0.7,
    left: '50%',
    top: '50%',
    translateX: '-50%',
    translateY: '-50%',
    transition: { duration: 0.1 },
  }),
};

interface Props {
  isOpen: boolean;
  close?: () => void;
  exit?: () => void;
  children?: ReactNode;
}

const Overlay = ({ isOpen, children }: Props) => {

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={overlayVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.2 }}
          className="fixed w-full max-w-[550px] h-[450px] flex flex-col justify-center items-center rounded-2xl gap-8 bg-white shadow-lg z-50 p-8"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Overlay;

const Title = ({children}: {children: ReactNode}) => {
  return (
    <h2 className="font-bold text-2xl">{children}</h2>
  )
}

const Description = ({children}: {children: ReactNode}) => {
  return (
    <p>{children}</p>
  )
}

const Content = ({children}: {children: ReactNode}) => {
  return (
    <>{children}</>
  )
}

Overlay.Title = Title;
Overlay.Description = Description;
Overlay.Content = Content;