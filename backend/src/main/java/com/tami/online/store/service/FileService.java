package com.tami.online.store.service;

import com.tami.online.store.dto.FileDtoResponse;
import com.tami.online.store.exception.CustomBadRequestException;
import com.tami.online.store.exception.InternalServerException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@Service
public class FileService {
    private static final Path root = Paths.get("files");
    private static final Logger LOGGER = LoggerFactory.getLogger(FileService.class);
    public FileDtoResponse save(MultipartFile file) {
        return this.save(file, "");
    }

    public FileService() {
        init();
    }

    public void init() {
        if (!Files.exists(root)) {
            try {
                Files.createDirectories(root);
            } catch (IOException e) {
                throw new InternalServerException("Could not create " + root + " directory (Files exception), errorMessage: " + e.getMessage());
            }
        }
    }

    public FileDtoResponse save(MultipartFile file, String prefixPath) {
        String fileName = file.getOriginalFilename();
        String fileType = file.getContentType();

        if (fileName == null) {
            throw new CustomBadRequestException("file name is null");
        }

        if (fileType == null) {
            throw new CustomBadRequestException("file type is null");
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

            Files.copy(file.getInputStream(), finalPath.resolve(fileName), StandardCopyOption.REPLACE_EXISTING);

            return FileDtoResponse.builder()
                    .name(fileName)
                    .type(fileType)
                    .path(finalPath.resolve(fileName).toFile().getPath())
                    .build();

        } catch (IOException e) {
            LOGGER.error("Could not store the file. Error: " + e.getMessage(), e);
            throw new InternalServerException("Could not store the file. Error: " + e.getMessage());
        }
    }

    public Resource load(String filePath) {
        try {
            Resource resource = new UrlResource(Paths.get(filePath).toUri());

            if (resource.exists() || resource.isReadable()) {
                return resource;
            } else {
                throw new CustomBadRequestException("Could not read the file!");
            }
        } catch (MalformedURLException e) {
            throw new CustomBadRequestException("Error: " + e.getMessage());
        }
    }
}
