package com.example.backend.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "asos")
@Entity
@Builder
public class Asos {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @OneToOne
    private SubCategory subCategory;
    private Integer type;
//    0 umuman kerak emas
//    1 ixtiyoriy
//    2 majburiy


    public Asos(SubCategory subCategory, Integer type) {
        this.subCategory = subCategory;
        this.type = type;
    }
}
