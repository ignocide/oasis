package ignocide.service.todo.service.impl;

import ignocide.service.todo.domain.Todo;
import ignocide.service.todo.repository.TodoRepository;
import ignocide.service.todo.service.TodoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TodoServiceImpl implements TodoService{
    @Autowired
    TodoRepository todoRepository;

    @Override
    public List<Todo> findAllByBoardId(Long boardId) {
        return todoRepository.findByBoardId(boardId);
    }

    @Override
    public void create(Todo todo) {
        todoRepository.save(todo);
    }
}
