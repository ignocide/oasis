package ignocide.service.todo.controller.task;

import ignocide.sandbox.util.LoginUser;
import ignocide.service.todo.domain.Board;
import ignocide.service.todo.service.BoardService;
import ignocide.service.todo.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/board/{boardId}/task")
@PreAuthorize("hasRole('USER')")
public class DeleteTaskController {

    @Autowired
    TaskService taskService;

    @Autowired
    BoardService boardService;


    @DeleteMapping("/{taskId}")
    public ResponseEntity deleteTask(@PathVariable("boardId") Long boardId, @PathVariable("taskId") Long taskId) {
        Long userId = LoginUser.getLoginUserId();

        Board board = boardService.findBoardByIdAndUserId(userId, boardId);

        if (board == null) {
            return new ResponseEntity(HttpStatus.FORBIDDEN);
        }

        taskService.delete(taskId);

        return ResponseEntity.ok().build();
    }
}