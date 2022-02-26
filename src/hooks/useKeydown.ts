import {useEffect, useState} from "react";

function useKeydown(targetKeys: string[], handler: (event: KeyboardEvent) => void): void {
  const [fired, setFired] = useState(false)

  useEffect(() => {
    const downHandler = (event: KeyboardEvent) => {
      if (!fired && targetKeys.includes(event.key)) {
        handler(event)
        setFired(true)
      }
    }
    window.addEventListener("keydown", downHandler);

    const upHandler = (event: KeyboardEvent) => {
      console.log('Up')
      if (targetKeys.includes(event.key)) {
        setFired(false)
      }
    }
    window.addEventListener("keyup", upHandler);

    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  }, [fired, handler, targetKeys]);
}

export default useKeydown
