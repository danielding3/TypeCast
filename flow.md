Here I'll talk about the general flow of the app.


This is my first time building with a high quality, hook centric pattern. 


useHandDetection.tsx - This is where the hand detection will occur, along with mediapipe initialization.
The hook will return: 
- handDetected (boolean);
- isPointing (boolean)
And the hook will take as props:
- ctx, canvasRef, videoRef
since it will also be responsible for drawing. 

HandDetector will call useHandDetection, and also the hooks needed to initialize the device, canvas, and thought generation API.

It is the master component, and generates all the refs that the hooks use

It will then collate this all and send it to the main rendering component
The main component will render the canvas.
----

So from here, what should I do? I have a hand detector. I should turn this into a hook, and separate out the initialization of my refs into a separate HandDetector.tsx component