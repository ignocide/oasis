package ignocide.service.todo.service;

import ignocide.service.todo.domain.Todo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface TodoService {
    List<Todo> findAllByBoardId(Long boardId);
    void create(Todo todo);
}
