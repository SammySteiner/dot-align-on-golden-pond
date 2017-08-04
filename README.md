## About

This repository is a single page demo for On Golden Pond as part of the DotAlign code challenge.

## Challenge

You are writing a simulation of ducks on a curiously rectangular pond. A duck’s position and location is represented by a combination of x and y co-ordinates and a letter representing one of the four cardinal compass points. The pond is divided up into a grid to simplify navigation. An example position might be 0, 0, N, which means the duck is in the bottom left corner and facing North.  
In order to control a duck, you send a simple string of letters. The possible letters are 'P', 'S' and 'F'. 'P' and 'S' makes the duck spin 90 degrees toward port side (left) or starboard (right) respectively, without moving from its current spot. 'F' means move forward one grid point, and maintain the same heading.  
Assume that the square directly North from (x, y) is (x, y+1).  
#### Input
The first line of input is the upper-right coordinates of the pond, the lower-left coordinates are assumed to be 0,0.  
The rest of the input is information pertaining to the ducks being simulated. Each duck has two lines of input. The first line gives the duck's position, and the second line is a series of instructions telling the duck how to explore the pond.  
The position is made up of two integers and a letter separated by spaces, corresponding to the x and y co-ordinates and the duck’s orientation.  
Each duck will be finished sequentially, which means that the second duck won't start to move until the first one has finished moving.  
#### Output
The output for each duck should be its final co-ordinates and heading.  
#### Input and Output
##### Test Input
5 5  
1 2 N  
PFPFPFPFF  
3 3 E  
FFSFFSFSSF  
##### Expected Output
1 3 N  
5 1 E  

## Installation
After either downloading the repository, and unzipping it if necessary, open the index.html file with a web browser. I've tested the application in Chrome, Firefox, and Safari, but not IE.

## Instructions
Enter number coordinates in the Pond Size field, separated by a space. In the Duck Info field, enter your duck positions and duck movement instructions, each on a new line, for each duck. Duck positions should be formatted with starting coordinates, similar to Pond Size, and an orientation, either N, S, E, or W, this is separated from the coordinates with a space. Duck movement instructions should be a string of the letters P, S, or F. P is to turn the duck to port (left from the perspective of the duck), S is to turn the duck to starboard (right from the perspective of the duck), and F is to move the duck forward in the direction it is facing.
