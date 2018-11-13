package ignocide.service.todo.service;

import ignocide.service.todo.domain.Step;
import ignocide.service.todo.domain.Todo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface TodoService {
    List<Todo> findAllByBoardId(Long boardId);

    void create(Todo todo);

    void update(Long todoId, Todo todo);

    void updateStep(Long todoId, Step step);

    void delete(Long todoId);
}
