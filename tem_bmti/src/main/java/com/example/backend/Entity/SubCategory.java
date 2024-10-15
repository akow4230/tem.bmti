package com.example.backend.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "sub_categories")
@Entity
@Builder
public class SubCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;
    @CreationTimestamp
    private LocalDateTime created_at;

    public SubCategory(String name, LocalDateTime created_at, Category categories, Integer service_day) {
        this.name = name;
        this.created_at = created_at;
        this.categories = categories;
        this.service_day = service_day;
    }

    @ManyToOne
    private Category categories;
    private Integer service_day;
}
