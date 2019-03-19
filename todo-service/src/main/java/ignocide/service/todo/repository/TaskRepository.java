package ignocide.service.todo.repository;


import ignocide.service.todo.domain.Step;
import ignocide.service.todo.domain.Task;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Pageable;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByBoardIdAndDeletedFalse(Long boardId);

    Task findTodoByIdAndDeletedFalse(Long todoId);

    Page<Task> findByBoardIdAndStepAndDeletedFalseOrderByIdDesc(Long boardId, Step step, Pageable pageable);

    List<Task> findByBoardIdAndStepAndDeletedFalseOrderByIdDesc(Long boardId, Step step);
}