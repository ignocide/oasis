package ignocide.service.todo.service.impl;

import ignocide.service.todo.domain.Board;
import ignocide.service.todo.repository.BoardRepository;
import ignocide.service.todo.service.BoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

//import javax.transaction.Transactional;

//@Transactional
@Service
public class BoardServiceImpl implements BoardService {
    @Autowired
    private BoardRepository boardRepository;

    @Override
    public List<Board> findAll(Long userId) {
        return boardRepository.findByUserIdAndDeletedFalse(userId);
    }

    public Board findBoardByIdAndUserId(Long boardId, Long userId) {
        return boardRepository.findBoardByIdAndUserIdAndDeletedFalseOrderByIdDesc(boardId, userId);
    }

    @Override
    public Board create(Board board) {
        Board createdBoard = boardRepository.saveAndFlush(board);
        return createdBoard;
    }

    @Override
    public void update(Long userId, Long boardId, Board board) {
        Board target = boardRepository.findBoardByIdAndUserIdAndDeletedFalseOrderByIdDesc(boardId, userId);
        target.setName(board.getName());
        boardRepository.save(target);
    }

    @Override
    public void delete(Long userId, Long boardId) {
        Board target = boardRepository.findBoardByIdAndUserIdAndDeletedFalseOrderByIdDesc(boardId, userId);
        target.setDeleted(true);
        boardRepository.save(target);
    }
}
