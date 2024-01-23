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
        return this.save(file, "");
    }

    public FileDtoResponse save(MultipartFile file, String prefixPath) {
        String fileName = file.getOriginalFilename();
        String fileType = file.getContentType();

        if (fileName == null) {
            throw new RuntimeException("file name is null");
        }

        if (fileType == null) {
            throw new RuntimeException("file type is null");
        }

        try {
            String directoryToStore = "";

            if (prefixPath.charAt(0) == '/') {
                prefixPath = prefixPath.substring(1);
            }

            if (prefixPath.charAt(prefixPath.length() - 1) != '/') {
                prefixPath += '/';
            }

            if (file.getContentType().startsWith("image")) {
                directoryToStore = "images/" + prefixPath;
            }

            if (file.getContentType().startsWith("video")) {
                directoryToStore = "videos/" + prefixPath;
            }

            final Path finalPath = root.resolve(directoryToStore);

            if (!Files.exists(finalPath)) {
                 Files.createDirectories(finalPath);
            }

            if (Files.exists(finalPath.resolve(fileName))) {
//                throw new ProductException("Файл с именем " + fileName + " Уже существует");
            }

            Files.copy(file.getInputStream(), finalPath.resolve(fileName));

            return FileDtoResponse.builder()
                    .name(fileName)
                    .type(fileType)
                    .path(finalPath.resolve(fileName).toString())
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
