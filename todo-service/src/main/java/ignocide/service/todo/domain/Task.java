package ignocide.service.todo.domain;

import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@Data
public class Task implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long boardId;

    @Column(name = "name", nullable = false)
    private String name;

    private String detail;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    private Step step;

    private boolean deleted;

    //처음 생성
    public Task(String name, String detail) {
        this.name = name;
        this.detail = detail;
        this.step = Step.TODO;
    }
}
