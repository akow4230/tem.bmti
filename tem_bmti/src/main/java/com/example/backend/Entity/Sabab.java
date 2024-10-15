package com.example.backend.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "sabab")
@Entity
@Builder
public class Sabab {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @ManyToOne
    private SubCategory subCategory;
    private String title;

    public Sabab(SubCategory subCategory, String title) {
        this.subCategory = subCategory;
        this.title = title;
    }

}
