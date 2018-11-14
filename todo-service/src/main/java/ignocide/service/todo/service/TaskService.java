package ignocide.service.todo.service;

import ignocide.service.todo.domain.Step;
import ignocide.service.todo.domain.Task;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface TaskService {
    List<Task> findAllByBoardId(Long boardId);

    Task findById(Long todoId);

    void create(Task task);

    void update(Long todoId, Task task);

    void updateStep(Long todoId, Step step);

    void delete(Long todoId);
}
