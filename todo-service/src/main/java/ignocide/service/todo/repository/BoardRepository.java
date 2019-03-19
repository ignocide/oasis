package ignocide.service.todo.repository;


import ignocide.service.todo.domain.Board;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BoardRepository extends JpaRepository<Board, Long> {
//    Page<Board> findByUserIdAndDeletedFalse(Long boardId, Pageable pageable);
    List<Board> findByUserIdAndDeletedFalse(Long userId);

    Board findBoardByIdAndUserIdAndDeletedFalseOrderByIdDesc(Long boardId, Long userId);

}