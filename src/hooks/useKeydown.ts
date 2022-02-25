import {useEffect, useState} from "react";

function useKeydown(targetKeys: string[], handler: (event: KeyboardEvent) => void): void {
  const [fired, setFired] = useState(false)

  useEffect(() => {
    const downHandler = (event: KeyboardEvent) => {
      if (!fired && targetKeys.includes(event.key)) {
        setFired(true)
        handler(event)
      }
    }
    window.addEventListener("keydown", downHandler);

    const upHandler = (event: KeyboardEvent) => {
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
  }, [fired, handler, targetKeys]); // Empty array ensures that effect is only run on mount and unmount
}

export default useKeydown
