package com.example.backend.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "appeal")
@Entity
@Builder
public class Appeal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @ManyToOne
    private Student student;
    private LocalDateTime created_at;
    @ManyToOne
    private SubCategory subCategory;
    private String appealText;
    @ManyToOne
    private Attachment appealFile;
    @ManyToOne
    private User admin;
    private LocalDateTime responseDay;
    private String response_text;
    @ManyToOne
    private Attachment response_file;
    @ManyToOne
    private AppealType appealType;

    public Appeal(Student student, LocalDateTime created_at, SubCategory subCategory, String appealText, Attachment appealFile, User admin, LocalDateTime responseDay, String response_text, Attachment response_file, AppealType appealType) {
        this.student = student;
        this.created_at = created_at;
        this.subCategory = subCategory;
        this.appealText = appealText;
        this.appealFile = appealFile;
        this.admin = admin;
        this.responseDay = responseDay;
        this.response_text = response_text;
        this.response_file = response_file;
        this.appealType = appealType;
    }
}
