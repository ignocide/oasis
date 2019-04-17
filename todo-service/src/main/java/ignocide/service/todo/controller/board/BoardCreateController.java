package ignocide.service.todo.controller.board;

import ignocide.sandbox.util.LoginUser;
import ignocide.service.todo.controller.board.form.BoardCreateForm;
import ignocide.service.todo.domain.Board;
import ignocide.service.todo.service.BoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/board")
@PreAuthorize("hasRole('USER')")
public class BoardCreateController {
    @Autowired
    BoardService boardService;

    @PostMapping
    public ResponseEntity createBoard(@RequestBody BoardCreateForm form) {

        LoginUser user = LoginUser.getLoginUser();

        Board board = form.toBoard();
        board.setUserId(user.getId());
        Board createdBoard = boardService.create(board);

        return ResponseEntity.ok(createdBoard);
    }
}

