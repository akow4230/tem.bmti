package com.example.backend.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "groups")
@Entity
@Builder
public class Groups {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String department;
    @Column(unique = true, nullable = false)
    private String name;
    private String specialty;
    private String educationLang;

    public Groups(String department, String name, String specialty, String educationLang) {
        this.department = department;
        this.name = name;
        this.specialty = specialty;
        this.educationLang = educationLang;
    }
}
