package com.tami.online.store.service;

import com.tami.online.store.dto.FileDtoResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class FileService {
    private static final Path root = Paths.get("files");
    private static final Logger LOGGER = LoggerFactory.getLogger(FileService.class);

    public FileDtoResponse save(MultipartFile file) {
        String fileName = file.getOriginalFilename();
        String fileType = file.getContentType();

        if (fileName == null) {
            throw new RuntimeException("file name is null");
        }

        if (fileType == null) {
            throw new RuntimeException("file type is null");
        }

        try {
            String filePathToStore = fileName;

            if (file.getContentType().startsWith("image")) {
                filePathToStore = "images/" + filePathToStore;
            }

            if (file.getContentType().startsWith("video")) {
                filePathToStore = "videos/" + filePathToStore;
            }

            Files.copy(file.getInputStream(), root.resolve(filePathToStore));

            return FileDtoResponse.builder()
                    .name(file.getName())
                    .type(fileType)
                    .path(filePathToStore)
                    .build();

        } catch (IOException e) {
            LOGGER.error("Could not store the file. Error: " + e.getMessage(), e);
            throw new RuntimeException("Could not store the file. Error: " + e.getMessage());
        }
    }

    public Resource load(String filename) {
        throw new RuntimeException("");
    }
}
