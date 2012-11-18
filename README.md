# Simple physics simulator

This is a simple physics simulator written in JavaScript. It is based on Verlet integration and simple vector geometry.
It is capable of handling collision between circles and lines, simple constraint solving with distance between points
(somewhat simulating springs, physically incorrect though).

The simulator is heavily based on the paper Advanced Character Physics by Thomas Jakobsen.

The physic simulator is used to simulate a simple bike. With a bit more polish is would work fine for an Elasto Mania/X-Moto like game.

RequireJS is utilized for organizing the code into flexible modules.

##Stuff to-do:
* Implement bezier curves instead of just straight lines
* The physics still needs some tweaking.
* Make the viewport follow the bike
