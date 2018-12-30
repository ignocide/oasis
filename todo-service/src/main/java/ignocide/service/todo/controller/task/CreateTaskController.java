package ignocide.service.todo.controller.task;

import ignocide.sandbox.util.LoginUser;
import ignocide.service.todo.controller.task.form.TodoForm;
import ignocide.service.todo.domain.Board;
import ignocide.service.todo.domain.Task;
import ignocide.service.todo.service.BoardService;
import ignocide.service.todo.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/board/{boardId}/task")
@PreAuthorize("hasRole('USER')")
public class CreateTaskController {

    @Autowired
    TaskService taskService;

    @Autowired
    BoardService boardService;

    @PostMapping
    public ResponseEntity createTask(@RequestBody TodoForm form, @PathVariable("boardId") Long boardId) {
//        Long userId = LoginUser.getLoginUserId();

        Task task = form.toTodo();
        task.setBoardId(boardId);
        task = taskService.create(task);

        return ResponseEntity.ok(task);
    }
}
