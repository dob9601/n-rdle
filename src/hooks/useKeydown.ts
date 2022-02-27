import {useEffect, useState} from "react";

function useKeydown(targetKeys: string[], handler: (event: KeyboardEvent) => void): void {
  const [pressedKeys, setPressedKeys] = useState(new Set())

  useEffect(() => {
    const downHandler = (event: KeyboardEvent) => {
      const key = event.key


      if (!pressedKeys.has(key) && targetKeys.includes(event.key)) {
        handler(event)
        setPressedKeys(new Set([...pressedKeys, key]))
      }
    }
    window.addEventListener("keydown", downHandler);

    const upHandler = (event: KeyboardEvent) => {
      const key = event.key

      if (targetKeys.includes(event.key)) {
        const newPressedKeys = new Set(pressedKeys)
        newPressedKeys.delete(key)
        setPressedKeys(newPressedKeys)
      }
    }
    window.addEventListener("keyup", upHandler);

    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  }, [pressedKeys, handler, targetKeys]);
}

export default useKeydown
