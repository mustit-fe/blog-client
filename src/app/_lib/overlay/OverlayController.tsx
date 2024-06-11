import {
  forwardRef,
  Ref,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react'

interface Props {
  overlayElement: CreateOverlayElement
  onExit: () => void
}

export type CreateOverlayElement = (props: {
  isOpen: boolean
  close: () => void
  exit: () => void
}) => JSX.Element

export interface OverlayControlRef {
  close: () => void
}

export const OverlayController = forwardRef(function OverlayController(
  { overlayElement: OverlayElement, onExit }: Props,
  ref: Ref<OverlayControlRef>,
) {
  const [isOpenOverlay, setIsOpenOverlay] = useState(false)

  const handleOverlayClose = useCallback(() => setIsOpenOverlay(false), [])

  useImperativeHandle(
    ref,
    () => {
      return { close: handleOverlayClose }
    },
    [handleOverlayClose],
  )

  useEffect(() => {
    // NOTE: requestAnimationFrame이 없으면 가끔 Open 애니메이션이 실행되지 않는다.
    requestAnimationFrame(() => {
      setIsOpenOverlay(true)
    })
  }, [])

  return (
    <OverlayElement
      isOpen={isOpenOverlay}
      close={handleOverlayClose}
      exit={onExit}
    />
  )
})
