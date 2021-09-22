# Assignment 1: Mask
## Description
The project is a mask that express a dizzy feeling. The concept is inspired by how I feel when I code during late night, especially when I'm debugging.

I create a spiral by drawing small ellipse with a growing distance from the center of the polar coordinates, and make it rotate by translating (rotating) the polar coordinates every frame. The problem I had is make the size of the rotating spiral responsive to the size of face mesh. To achieve that, I calculate the distance of two key points of the eyes part of the mesh, and map it to the scale of the spiral.


![image](https://github.com/EffieSong/Computational-Portraiture/raw/master/Assignment_1/mask.png)


[![](https://github.com/EffieSong/openframeworks/raw/master/Project_1_Final/mask.png)](https://editor.p5js.org/yunfeisong/sketches/Z6RqGcR4d)
