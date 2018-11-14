package ignocide.service.todo.service;

import ignocide.service.todo.domain.Board;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface BoardService {

    List<Board> findAll(Long userId);

    Board findBoardByIdAndUserId(Long boardId, Long userId);

    void create(Board user);

}
