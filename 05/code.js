function Maze(instructions, current) {
  this.instructions = instructions
  this.current = current
}

function progress_maze(maze, modify_current_instruction) {
  let cur = maze.current
  maze.current += maze.instructions[cur]
  maze.instructions[cur] = modify_current_instruction(maze.instructions[cur])
  return maze
}

function calculate_steps_to_escape(instructions, modify_current_instruction) {
  let steps = 0
  maze = new Maze(instructions, 0)
  while ((maze.current < maze.instructions.length) && (maze.current >= 0)) {
    maze = progress_maze(maze, modify_current_instruction)
    steps++
  }
  return steps
}

function escape_maze(instructions) {
  return calculate_steps_to_escape(instructions, (x) => x + 1)
}

function escape_maze2(instructions) {
  return calculate_steps_to_escape(instructions, (x) => x >= 3 ? x - 1 : x + 1)
}
