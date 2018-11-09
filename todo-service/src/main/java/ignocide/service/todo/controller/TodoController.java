package ignocide.service.todo.controller;

import ignocide.sandbox.util.LoginUser;
import ignocide.service.todo.controller.form.TodoForm;
import ignocide.service.todo.domain.Board;
import ignocide.service.todo.domain.Todo;
import ignocide.service.todo.service.BoardService;
import ignocide.service.todo.service.TodoService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/board/{boardId}/todo")
@PreAuthorize("hasRole('USER')")
public class TodoController {

    @Autowired
    TodoService todoService;

    @Autowired
    BoardService boardService;


    @PostMapping
    public ResponseEntity create(@RequestBody TodoForm form, @PathVariable("boardId") Long boardId) {
        Long userId = LoginUser.getLoginUserId();

        Board board = boardService.findBoardByIdAndUserId(userId, boardId);

        if (board == null) {
            return new ResponseEntity(HttpStatus.FORBIDDEN);
        }

        Todo todo = form.toTodo();
        todo.setBoardId(boardId);
        todoService.create(todo);

        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{todoId}")
    public ResponseEntity delete(@PathVariable("boardId") Long boardId, @PathVariable("todoId") Long todoId) {
        Long userId = LoginUser.getLoginUserId();

        Board board = boardService.findBoardByIdAndUserId(userId, boardId);

        if (board == null) {
            return new ResponseEntity(HttpStatus.FORBIDDEN);
        }

        todoService.delete(todoId);

        return ResponseEntity.ok().build();
    }

    @PutMapping("/{todoId}")
    public ResponseEntity update(@PathVariable("boardId") Long boardId, @PathVariable("todoId") Long todoId,@RequestBody TodoForm todo) {

        Todo updateTodo = todo.toTodo();
        todoService.update(todoId,updateTodo);

        return ResponseEntity.ok().build();
    }


//    @PutMapping("/{todoId}")
//    public ResponseEntity update(@PathVariable("boardId") Long boardId,
//                                 @PathVariable("todoId") Long todoId,
//                                 Todo todo){
//        todoService.remove(todoId);
//
//        return ResponseEntity.ok().build();
//    }

}

