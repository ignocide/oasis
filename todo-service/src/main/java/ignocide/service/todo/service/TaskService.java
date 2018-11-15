package ignocide.service.todo.service;

import ignocide.service.todo.domain.Step;
import ignocide.service.todo.domain.Task;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface TaskService {
    List<Task> findAllByBoardId(Long boardId);

    Task findById(Long todoId);

    Task create(Task task);

    Task update(Long todoId, Task task);

    Task updateStep(Long todoId, Step step);

    void delete(Long todoId);

    List<Task> findTodosByBoardId(Long boardId);

    Page<Task> findDonesByBoardId(Long boardId, Pageable pageable);
}
