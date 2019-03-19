package ignocide.service.todo.controller.board;

import ignocide.sandbox.util.LoginUser;
import ignocide.service.todo.controller.board.form.BoardCreateForm;
import ignocide.service.todo.domain.Board;
import ignocide.service.todo.service.BoardService;
import ignocide.service.todo.service.TaskService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/board")
@PreAuthorize("hasRole('USER')")
public class BoardUpdateController {
    @Autowired
    BoardService boardService;

    @Autowired
    TaskService taskService;

    @PutMapping("/{boardId}")
    public ResponseEntity updateBoard(@RequestBody BoardCreateForm form, @PathVariable("boardId") Long boardId) {

        LoginUser user = LoginUser.getLoginUser();

        Board board = form.toBoard();
        board.setUserId(user.getId());
        boardService.update(user.getId(), boardId, board);


        Board updatedBoard = boardService.findBoardByIdAndUserId(boardId, user.getId());

        Map<String, Object> map = new HashMap<String, Object>();
        map.put("board", updatedBoard);

        return ResponseEntity.ok(map);
    }
}

