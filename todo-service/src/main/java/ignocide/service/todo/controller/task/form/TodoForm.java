package ignocide.service.todo.controller.task.form;

import ignocide.service.todo.domain.Task;
import lombok.Data;

@Data
public class TodoForm {
    private String name;
    private String detail;

    public Task toTodo() {
        return new Task(this.name, this.detail);
    }
}
