let camera;
let poseNet;
let poses = [];

function setup() {
    createCanvas(800, 600); // Set canvas size for the webcam feed

    // Initialize the webcam
    camera = createCapture(VIDEO);
    camera.size(width, height); // Match the canvas size
    camera.hide();

    // Load PoseNet and pass the video as input
    poseNet = ml5.poseNet(camera, modelLoaded);
    poseNet.on('pose', gotPoses); // Listen for pose events
}

function modelLoaded() {
    console.log('PoseNet Model Loaded!');
}

function gotPoses(results) {
    poses = results;
}

function draw() {
    background(100);

    // Display the webcam input
    image(camera, 0, 0, width, height);

    // Draw poses 
    drawPoses();
}

function drawPoses() {
    if (poses.length > 0) {
        for (let i = 0; i < poses.length; i++) {
            let pose = poses[i].pose;

            // Loop through all keypoints
            for (let j = 0; j < pose.keypoints.length; j++) {
                let keypoint = pose.keypoints[j];
                if (keypoint.score > 0.2) { // Confidence threshold
                    fill(255, 0, 0);
                    noStroke();
                    ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
                }
            }

            // Draw skeleton
            for (let j = 0; j < poses[i].skeleton.length; j++) {
                let partA = poses[i].skeleton[j][0];
                let partB = poses[i].skeleton[j][1];
                stroke(255, 255, 255);
                strokeWeight(2);
                line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
            }
        }
    }
}
