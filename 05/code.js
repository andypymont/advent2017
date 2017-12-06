function Maze(instructions, current) {
  this.instructions = instructions
  this.current = current
}

function progress_maze(maze) {
  return new Maze(maze.instructions.map((value, index) => (index === maze.current) ? value+1 : value),
                  maze.current + maze.instructions[maze.current])
}

function escape_maze(instructions) {
  let steps = 0
  maze = new Maze(instructions, 0)
  while ((maze.current < maze.instructions.length) && (maze.current >= 0)) {
    maze = progress_maze(maze)
    steps++
  }
  return steps
}
