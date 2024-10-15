package com.example.backend.Entity;

import com.example.backend.Enums.AppealTypes;
import com.example.backend.Enums.UserRoles;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "appeal_type")
@Entity
@Builder
public class AppealType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(unique = true, nullable = false)
    @Enumerated(EnumType.STRING)
    private AppealTypes name;

}
