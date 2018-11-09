package ignocide.service.todo.controller.form;

import ignocide.service.todo.domain.Todo;
import lombok.Data;

@Data
public class TodoForm {
    private String name;
    private String detail;

    public Todo toTodo() {
        return new Todo(this.name, this.detail);
    }
}
