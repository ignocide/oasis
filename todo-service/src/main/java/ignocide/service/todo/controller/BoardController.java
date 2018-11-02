package ignocide.service.todo.controller;

import ignocide.service.todo.controller.form.BoardCreateForm;
import ignocide.service.todo.domain.Board;
import ignocide.service.todo.service.user.BoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/board")
public class BoardController {
    @Autowired
    BoardService boardService;

    @PostMapping
    public ResponseEntity createBoard(@RequestBody BoardCreateForm userForm){

        Board user = userForm.toBoard();
        boardService.create(user);

        return ResponseEntity.ok().build();
    }

    @GetMapping
    public ResponseEntity getList(Pageable pageable){
//        Page<RequisitionDto> page = requisitionService.findRelateBy(LoginUser.getLoginUserId(), pageable);
        Page<Board> page = boardService.findAll(pageable);
        return ResponseEntity.ok(page);
    }
}

