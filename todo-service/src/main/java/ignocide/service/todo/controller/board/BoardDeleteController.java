package ignocide.service.todo.controller.board;

import ignocide.sandbox.util.LoginUser;
import ignocide.service.todo.service.BoardService;
import ignocide.service.todo.service.TaskService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/board")
@PreAuthorize("hasRole('USER')")
public class BoardDeleteController {
    @Autowired
    BoardService boardService;

    @Autowired
    TaskService taskService;

    @DeleteMapping("/{boardId}")
    public ResponseEntity deleteBoard(@PathVariable("boardId") Long boardId) {

        LoginUser user = LoginUser.getLoginUser();

        boardService.delete(user.getId(), boardId);

        return ResponseEntity.ok().build();
    }

}

