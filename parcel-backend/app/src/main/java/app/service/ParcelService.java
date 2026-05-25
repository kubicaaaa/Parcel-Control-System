package app.service;

import app.model.Parcel;
import app.repository.ParcelRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ParcelService {

    private final ParcelRepository repository;

    public ParcelService(ParcelRepository repository) {
        this.repository = repository;
    }

    public List<Parcel> getAll() {
        return repository.findAll();
    }

    public Optional<Parcel> getById(int id) {
        return repository.findById(id);
    }

    public Parcel create(Parcel parcel) {
        return repository.save(parcel);
    }

    public Parcel update(int id, Parcel updated) {
        updated.setId(id);
        return repository.save(updated);
    }

    public void delete(int id) {
        repository.deleteById(id);
    }
}