package ignocide.service.todo.controller;

import ignocide.sandbox.util.LoginUser;
import ignocide.service.todo.controller.form.TodoForm;
import ignocide.service.todo.domain.Board;
import ignocide.service.todo.domain.Step;
import ignocide.service.todo.domain.Task;
import ignocide.service.todo.service.BoardService;
import ignocide.service.todo.service.TaskService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/board/{boardId}/task")
@PreAuthorize("hasRole('USER')")
public class TaskController {

    @Autowired
    TaskService taskService;

    @Autowired
    BoardService boardService;


    @PostMapping
    public ResponseEntity create(@RequestBody TodoForm form, @PathVariable("boardId") Long boardId) {
        Long userId = LoginUser.getLoginUserId();

        Board board = boardService.findBoardByIdAndUserId(userId, boardId);

        if (board == null) {
            return new ResponseEntity(HttpStatus.FORBIDDEN);
        }

        Task task = form.toTodo();
        task.setBoardId(boardId);
        task = taskService.create(task);

        return ResponseEntity.ok(task);
    }

    @DeleteMapping("/{taskId}")
    public ResponseEntity delete(@PathVariable("boardId") Long boardId, @PathVariable("taskId") Long taskId) {
        Long userId = LoginUser.getLoginUserId();

        Board board = boardService.findBoardByIdAndUserId(userId, boardId);

        if (board == null) {
            return new ResponseEntity(HttpStatus.FORBIDDEN);
        }

        taskService.delete(taskId);

        return ResponseEntity.ok().build();
    }

    @PutMapping("/{taskId}")
    public ResponseEntity update(@PathVariable("boardId") Long boardId, @PathVariable("taskId") Long taskId, @RequestBody TodoForm todo) {

        Task updateTask = todo.toTodo();
        Task updatedTask = taskService.update(taskId, updateTask);

        return ResponseEntity.ok(updatedTask);
    }

    @PutMapping("/{taskId}/step")
    public ResponseEntity updateStep(@PathVariable("boardId") Long boardId, @PathVariable("taskId") Long taskId, @RequestBody Map<String, Object> body) {
        String stepStr = (String) body.get("step");

        Step step = Step.valueOf(stepStr.toUpperCase());
        Task updatedTask = taskService.updateStep(taskId, step);

        return ResponseEntity.ok(updatedTask);
    }


//    @PutMapping("/{todoId}")
//    public ResponseEntity update(@PathVariable("boardId") Long boardId,
//                                 @PathVariable("todoId") Long todoId,
//                                 Task todo){
//        todoService.remove(todoId);
//
//        return ResponseEntity.ok().build();
//    }

}

