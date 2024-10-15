package com.example.backend.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AppealDto {
    private String studentId;
    private Integer subCategoryId;
    private String appealText;
    private UUID attachmentId;
}
