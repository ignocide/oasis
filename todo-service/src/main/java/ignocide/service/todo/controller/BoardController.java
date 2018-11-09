package ignocide.service.todo.controller;

import ignocide.sandbox.util.LoginUser;
import ignocide.service.todo.controller.form.BoardCreateForm;
import ignocide.service.todo.domain.Board;
import ignocide.service.todo.domain.Todo;
import ignocide.service.todo.service.BoardService;
import ignocide.service.todo.service.TodoService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/board")
@PreAuthorize("hasRole('USER')")
public class BoardController {
    @Autowired
    BoardService boardService;

    @Autowired
    TodoService todoService;

    @PostMapping
    public ResponseEntity create(@RequestBody BoardCreateForm form) {

        LoginUser user = LoginUser.getLoginUser();

        Board board = form.toBoard();
        board.setUserId(user.getId());
        boardService.create(board);

        return ResponseEntity.ok().build();
    }

    @GetMapping
    public ResponseEntity getList(Pageable pageable) {
        LoginUser user = LoginUser.getLoginUser();

        Page<Board> page = boardService.findAll(user.getId(), pageable);
        return ResponseEntity.ok(page);
    }

    @GetMapping("/{boardId}")
    public ResponseEntity getTodoListByBoardId(@PathVariable("boardId") Long boardId) {
        LoginUser user = LoginUser.getLoginUser();

        List<Todo> todos = todoService.findAllByBoardId(boardId);

        return ResponseEntity.ok(todos);
    }

}

