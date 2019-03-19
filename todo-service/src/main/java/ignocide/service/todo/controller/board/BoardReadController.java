package ignocide.service.todo.controller.board;

import ignocide.sandbox.util.LoginUser;
import ignocide.service.todo.domain.Board;
import ignocide.service.todo.domain.Task;
import ignocide.service.todo.service.BoardService;
import ignocide.service.todo.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/board")
@PreAuthorize("hasRole('USER')")
public class BoardReadController {
    @Autowired
    BoardService boardService;

    @Autowired
    TaskService taskService;

    @GetMapping
    public ResponseEntity getBoardList() {
        LoginUser user = LoginUser.getLoginUser();

        List<Board> list = boardService.findAll(user.getId());
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("list", list);
        return ResponseEntity.ok(map);
    }

    @GetMapping("/{boardId}")
    public ResponseEntity getTodoAndDoneByBoardId(@PathVariable("boardId") Long boardId, Pageable pageable) {
        LoginUser user = LoginUser.getLoginUser();
        Board board = boardService.findBoardByIdAndUserId(boardId, user.getId());
        List<Task> tasks = taskService.findTodosByBoardId(boardId);

        Map<String, Object> result = new HashMap<>();

        result.put("board", board);
        result.put("tasks", tasks);
        return ResponseEntity.ok(result);
    }

}

