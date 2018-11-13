package ignocide.service.todo.service;

import ignocide.service.todo.domain.Board;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@RunWith(SpringRunner.class)
@DataJpaTest
public class BoardService {

    Page<Board> findAll(Long userId, Pageable pageable);

    Board findBoardByIdAndUserId(Long boardId, Long userId);

    void create(Board user);

}
