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
@Table(name = "admin_duty", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"admin_id", "sub_category_id"})
})
@Entity
@Builder
public class AdminDuty {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "admin_id", nullable = false)
    private User admin;

    @ManyToOne
    @JoinColumn(name = "sub_category_id", nullable = false)
    private SubCategory subCategory;

    private LocalDateTime created_at;

    public AdminDuty(User admin, SubCategory subCategory, LocalDateTime created_at) {
        this.admin = admin;
        this.subCategory = subCategory;
        this.created_at = created_at;
    }
}
