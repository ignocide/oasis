//package ignocide.service.todo.controller;
//
//import ignocide.sandbox.util.LoginUser;
//import ignocide.service.todo.controller.form.BoardCreateForm;
//import ignocide.service.todo.domain.Board;
//import ignocide.service.todo.domain.Todo;
//import ignocide.service.todo.service.BoardService;
//import ignocide.service.todo.service.TodoService;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.data.domain.Page;
//import org.springframework.data.domain.Pageable;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.access.prepost.PreAuthorize;
//import org.springframework.web.bind.annotation.*;
//
//@Slf4j
//@RestController
//@RequestMapping("/todo")
//@PreAuthorize("hasRole('USER')")
//public class TodoController {
//    @Autowired
//    TodoService todoService;
//
//    @GetMapping("/:boardId")
//    public ResponseEntity getList(@PathVariable("boardId")Long boardId){
//        LoginUser user = LoginUser.getLoginUser();
//
//        List<Todo> todos = todoService.findAllByBoardId(boardId)
//        return ResponseEntity.ok(page);
//    }
//}
//
