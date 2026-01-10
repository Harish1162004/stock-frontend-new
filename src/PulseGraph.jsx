

import "./pulse.css";

function PulseGraph() {
  return (
    <div className="pulse-container">
      <svg viewBox="0 0 500 100" className="pulse-svg">
        <polyline
          className="pulse-line"
          points="
            0,50
            40,50
            60,20
            80,80
            100,50
            140,50
            160,30
            180,70
            200,50
            240,50
            260,20
            280,80
            300,50
            340,50
            360,30
            380,70
            400,50
            500,50
          "
        />
      </svg>
    </div>
  );
}

export default PulseGraph;
