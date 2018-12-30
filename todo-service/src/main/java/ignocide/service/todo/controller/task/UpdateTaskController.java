package ignocide.service.todo.controller.task;

import ignocide.service.todo.controller.task.form.TodoForm;
import ignocide.service.todo.domain.Step;
import ignocide.service.todo.domain.Task;
import ignocide.service.todo.service.BoardService;
import ignocide.service.todo.service.TaskService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/board/{boardId}/task")
@PreAuthorize("hasRole('USER')")
public class UpdateTaskController {

    @Autowired
    TaskService taskService;

    @Autowired
    BoardService boardService;

    @PutMapping("/{taskId}")
    public ResponseEntity updateTask(@PathVariable("boardId") Long boardId, @PathVariable("taskId") Long taskId, @RequestBody TodoForm todo) {

        Task updateTask = todo.toTodo();
        Task updatedTask = taskService.update(taskId, updateTask);

        return ResponseEntity.ok(updatedTask);
    }

    @PutMapping("/{taskId}/step")
    public ResponseEntity updateTaskStep(@PathVariable("boardId") Long boardId, @PathVariable("taskId") Long taskId, @RequestBody Map<String, Object> body) {
        String stepStr = (String) body.get("step");

        Step step = Step.valueOf(stepStr.toUpperCase());
        Task updatedTask = taskService.updateStep(taskId, step);

        return ResponseEntity.ok(updatedTask);
    }
}

