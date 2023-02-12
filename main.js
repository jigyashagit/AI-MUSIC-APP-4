song1="";
song2="";
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
scoreleftWrist=0;
song1_status="";
song2_status="";
function preload()
{
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}
function setup()
{
    canvas = createCanvas(600,500);
    canvas.position(550,270);

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}
function modelLoaded()
{
    console.log('PoseNet is Intialized');
}
function gotPoses(results)
{
    if(results.length>0)
    {    
        scoreleftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreleftWrist="+ scoreleftWrist);

        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX ="+leftWristX+"leftWristY ="+leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightwristX ="+rightWristX+"rightWristY ="+rightWristY);
    }
}
function draw()
{
    image(video,0,0,600,500);
     fill("red");
     stroke("red");
     song1_status=song1.isPlaying;
     song2_status=song1.isPlaying;

    if(scoreleftWrist>0.001)
    {
       circle(leftWristX,leftWristY,20);
       song1.stop();

       if(song2_status==false)
       {
         song2.play()
         document.getElementById("song_name").innerHTML = "Playing Peter Pan Song "
       }
    }
}
function play()
{
    song1.play();
    song1.setVolume(0.5);
    song1.rate(1);
}