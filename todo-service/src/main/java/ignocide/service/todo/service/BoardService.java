package ignocide.service.todo.service;

import ignocide.service.todo.domain.Board;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface BoardService {

    List<Board> findAll(Long userId);

    Board findBoardByIdAndUserId(Long boardId, Long userId);

    Board create(Board board);

    void update(Long userId, Long boardId, Board board);

    void delete(Long userId, Long boardId);
}
