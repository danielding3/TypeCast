

interface Landmark {
  x: number;
  y: number;
}

export const drawLandmarks = (
  ctx: CanvasRenderingContext2D, 
  landmarks: Landmark[], 
  canvas: HTMLCanvasElement

) => {
  // kind of a DIY drawingUtils with a bit more customisability if needed
  const connections = [
    // Thumb
    [0, 1], [1, 2], [2, 3], [3, 4],
    // Index
    [0, 5], [5, 6], [6, 7], [7, 8],
    // Middle
    [5, 9], [9, 10], [10, 11], [11, 12],
    // Ring/Fourth Finger
    [9, 13], [13, 14], [14, 15], [15, 16],
    // Pinky
    [13,17], [0, 17], [17, 18], [18, 19], [19, 20],
    [2, 5]
  ]

  ctx.lineWidth = 3;
  ctx.strokeStyle = "#1a73e8" // googles color i guess

  // Draw lines between each landmark
  // Note that canvas width and height are multiplied with normalised landmarks.
  for (const [start, end] of connections) {
    ctx.beginPath();
    ctx.moveTo(landmarks[start].x * canvas.width, landmarks[start].y * canvas.height)
    ctx.lineTo(landmarks[end].x * canvas.width, landmarks[end].y * canvas.height)
    ctx.stroke();
  }
  // Draw circle at each landmark
  // ctx.fillStyle = "#FFCC00"
  // landmarks.forEach(landmark => {
  //   ctx.beginPath();
  //   ctx.arc(landmark.x * canvas.width, landmark.y * canvas.height, 4, 0, 2 * Math.PI )
  //   ctx.fill();
  //   ctx.closePath();
  // })
}

/**
 * Checks if hand is pointing (index finger is straight; others curled)
// @param {Array} landmarks - hand landmarks
// @returns {Object} - contains information like isPointing, and the general canvas positioning in which the finger is pointing at.
 */
export const fingerPose = (
  landmarks: Landmark[][], 
) => {

  const getLandmarkPoint = (index: number) => {
    // just getting from one hand for now.
    return {x: landmarks[0][index].x, y: landmarks[0][index].y};
  }
  


  if (landmarks && landmarks.length > 0) {
    const index_1 = getLandmarkPoint(5);
    const index_2 = getLandmarkPoint(6);
    const index_3 = getLandmarkPoint(7);
    const index_4 = getLandmarkPoint(8);
    
    const middle_1 = getLandmarkPoint(9);
    const middle_2 = getLandmarkPoint(10);
    const middle_3 = getLandmarkPoint(11);
    const middle_4 = getLandmarkPoint(12);

    const ring_1 = getLandmarkPoint(13);
    const ring_2 = getLandmarkPoint(14);
    const ring_3 = getLandmarkPoint(15);
    const ring_4 = getLandmarkPoint(16);

    const isIndexStraight = isFingerStraight(index_1, index_2, index_3, index_4)
    const isMiddleCurled = isFingerCurled(middle_1, middle_2, middle_3, middle_4)
    const isRingCurled = isFingerCurled(ring_1, ring_2, ring_3, ring_4)

    return {
      indexFinger: {
        base: index_1,
        joint1: index_2,
        joint2: index_3,
        tip: index_4 // Used later for image ROI.
      },
      isIndexStraight,
      isMiddleCurled,
      isRingCurled
    }

    // get landmark points from coordinates
    // if (landmarks) {
    //   landmarks.forEach(landmark => {
    //     console.log("index finger points: " + index_1,index_2,index_3, index_4)
        
    //   })
    // }
  }
  // no landmarks
  return null;
}

// ***** Helpers *******


/**
   * Determines if finger is straight by measuring angle between each joint
   * FUTURE: Also set exception in the case that all joints are overlapping (distance)
   * @param joint1 
   * @param joint2 
   * @param joint3 
   * @param joint4 
   * @returns {Boolean} true if finger is considered straight.
   */
const isFingerStraight = (
  joint1: Landmark, 
  joint2: Landmark, 
  joint3: Landmark, 
  joint4: Landmark
) => {
  const v1 = pointToVector(joint1, joint2); // base to second
  const v2 = pointToVector(joint2, joint3); // second to third
  const v3 = pointToVector(joint3, joint4); // third to tip

  const angle1 = angleBetweenVectors(v1, v2);
  const angle2 = angleBetweenVectors(v2, v3);

  // Find average of two angles
  // A straight finger will have an avg angle closer to 0
  const averageAngle = (angle1 + angle2) / 2

  const ANGLE_THRESHOLD = 0.05 // Higher = bigger cut-off

  // Debugging
  // console.log("### Finger Angle: ", averageAngle)

  if (averageAngle < Math.PI * ANGLE_THRESHOLD) {
    return true
  }
  return false;
}
/**
 * Determines if finger is curled based on proximity of tip to base
 * 
 * @param joint1 base
 * @param joint2 second 
 * @param joint3 third
 * @param joint4 tip
 */
const isFingerCurled = (
  joint1: Landmark, 
  joint2: Landmark, 
  joint3: Landmark, 
  joint4: Landmark
) => {
  const baseToTipDist = distance(joint4, joint1);
  const baseToSecondDist = distance(joint1, joint2);

  const CURL_THRESHOLD = 1.2 // Higher is more leniency

  if (baseToTipDist < baseToSecondDist * CURL_THRESHOLD) return true;
  return false;
}

// *** Sub-util helpers ? ***
/**
 * Finds distance between two 2D points
 * @param {Landmark} p1 point
 * @param {Landmark} p2 point
 * @returns {Number} distance
 */
const distance = (p1: Landmark, p2: Landmark): number  => {
  const d1 = (p1.x - p2.x)**2
  const d2 = (p1.y - p2.y)**2
  return (Math.sqrt(d1+d2));
}
/**
 * Converts two 2D points into a vector
 * @param {Landmark} p1 point 1 {x1, y1}
 * @param {Landmark} p2 point 2 {x2, y2}
 * @return {Object} vector object, {x, y}
 */
const pointToVector = (p1:Landmark, p2:Landmark) => {
  return { x: p2.x- p1.x, y: p2.y - p1.y }
}
/**
 * Finds the angle between two 2D vectors
 * @param {Landmark} v1 vector 1
 * @param {Landmark} v2 vector 2
 * @return {number} in radians.
 */
const angleBetweenVectors = (v1:Landmark , v2:Landmark) => {
  const magnitude1 = Math.sqrt(v1.x ** 2 + v1.y **2)
  const magnitude2 = Math.sqrt(v2.x ** 2 + v2.y **2)

  const dotProduct = v1.x*v2.x + v1.y*v2.y;
  // clamping cos angle value between [-1, 1] so that it doesn't break arccos
  const cosAngle = Math.max(-1, Math.min(1, dotProduct / (magnitude1 * magnitude2)))
  
  return (Math.acos(cosAngle))
}
