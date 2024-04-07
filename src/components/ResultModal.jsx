import React, { useImperativeHandle, useRef } from "react";
import { forwardRef } from "react";

const ResultModal = forwardRef(function ResultModal(
  { targetTime, remainingTime, onReset },
  ref
) {
  const dialog = useRef();
  const userLoss = remainingTime <= 0;
  const formattedRemainingTime = (remainingTime / 1000).toFixed(2);
  const score = Math.round(1 - remainingTime / (targetTime * 1000)) * 100;
  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
    };
  });
  return (
    <dialog className="result-modal" ref={dialog} onClose={onReset}>
      {userLoss && <h2>You Lost</h2>}
      {!userLoss && (
        <h2>
          Your Score : <strong>{score}</strong>
        </h2>
      )}
      <p>
        The Target Time was <strong> {targetTime}</strong> second
      </p>
      <p>
        {" "}
        You stopped with <strong> {formattedRemainingTime} second left</strong>
      </p>

      <form method="dialog" onSubmit={onReset}>
        <button>Close</button>
      </form>
    </dialog>
  );
});

export default ResultModal;
