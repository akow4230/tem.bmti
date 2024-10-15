package com.example.backend.Entity;

import com.example.backend.Enums.UserRoles;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;
import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "subjects")
@Entity
@Builder
public class Subject {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String subject1;
    private String subject2;
    private String group_name;
    @CreationTimestamp
    private LocalDateTime updated_at;

    public Subject(String subject1, String subject2, String group_name) {
        this.subject1 = subject1;
        this.subject2 = subject2;
        this.group_name = group_name;
    }
}
