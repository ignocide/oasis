package ignocide.service.todo.controller;

import ignocide.sandbox.util.LoginUser;
import ignocide.service.todo.controller.form.BoardCreateForm;
import ignocide.service.todo.domain.Board;
import ignocide.service.todo.domain.Task;
import ignocide.service.todo.service.BoardService;
import ignocide.service.todo.service.TaskService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/board")
@PreAuthorize("hasRole('USER')")
public class BoardController {
    @Autowired
    BoardService boardService;

    @Autowired
    TaskService taskService;

    @PostMapping
    public ResponseEntity create(@RequestBody BoardCreateForm form) {

        LoginUser user = LoginUser.getLoginUser();

        Board board = form.toBoard();
        board.setUserId(user.getId());
        boardService.create(board);

        return ResponseEntity.ok().build();
    }

    @GetMapping
    public ResponseEntity getList() {
        LoginUser user = LoginUser.getLoginUser();

        List<Board> list = boardService.findAll(user.getId());
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("list", list);
        return ResponseEntity.ok(map);
    }

    @GetMapping("/{boardId}")
    public ResponseEntity getTodoAndDoneByBoardId(@PathVariable("boardId") Long boardId, Pageable pageable) {
        LoginUser user = LoginUser.getLoginUser();

        List<Task> todos = taskService.findTodosByBoardId(boardId);
        Page<Task> dones = taskService.findDonesByBoardId(boardId, pageable);

        Map<String, Object> result = new HashMap<>();

        result.put("todo", todos);
        result.put("done", dones);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/{boardId}/done")
    public ResponseEntity getDoneListByBoardId(@PathVariable("boardId") Long boardId, Pageable pageable) {

        Page<Task> dones = taskService.findDonesByBoardId(boardId, pageable);

        Map<String, Object> result = new HashMap<>();

        result.put("done", dones);
        return ResponseEntity.ok(result);
    }
}

