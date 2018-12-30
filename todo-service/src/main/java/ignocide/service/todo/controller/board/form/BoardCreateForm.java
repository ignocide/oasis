package ignocide.service.todo.controller.board.form;

import ignocide.service.todo.domain.Board;
import lombok.Data;

@Data
public class BoardCreateForm {
    private String name;

    public Board toBoard() {
        return new Board(this.name);
    }
}
