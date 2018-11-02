package ignocide.service.todo.domain;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@Data
public class Todo implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "board_id")
    private Board board;

    @Column(name="name", nullable = false)
    private String name;

    private String detail;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    private Step step;

    private boolean deleted;

    public Todo(String name){
        this.name = name;
    }
}
