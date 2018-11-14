package ignocide.service.todo.repository;


import ignocide.service.todo.domain.Task;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends CrudRepository<Task, Long> {
    List<Task> findByBoardIdAndDeletedFalse(Long boardId);

    Task findTodoByIdAndDeletedFalse(Long todoId);
}