package com.tami.online.store.service;

import com.tami.online.store.dto.CollectionDtoRequest;
import com.tami.online.store.exception.NotFoundException;
import com.tami.online.store.model.Collection;
import com.tami.online.store.repository.CollectionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CollectionService {

    private final CollectionRepository collectionRepository;

    public List<Collection> getAllCollections() {
        return collectionRepository.findAll();
    }

    public Collection createCollection(CollectionDtoRequest collectionDtoRequest) {
        Collection collection = Collection.builder()
                .name(collectionDtoRequest.getCollectionName())
                .build();

        return collectionRepository.save(collection);
    }

    public Collection updateCollection(CollectionDtoRequest collectionDtoRequest, Long id) {
        Collection collectionFromDb = collectionRepository
                .findById(id)
                .orElseThrow(() -> new NotFoundException("Коллекция с id " + id + " не существует"));

        if (collectionDtoRequest.getCollectionName() != null) {
            collectionFromDb.setName(collectionDtoRequest.getCollectionName());
            collectionRepository.save(collectionFromDb);
        }

        return collectionFromDb;
    }

    public void deleteCollection(Long id) {
        collectionRepository.deleteById(id);
    }
}
