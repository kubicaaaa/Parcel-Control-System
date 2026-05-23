package app.service;

import app.model.Transaction;
import app.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class ParcelService {
    @Autowired
    private ParcelRepository repository;

    public List<Parcel> findAll() {
        return repository.findAll();
    }

    public Parcel findById(@PathVariable Integer id) {
        return repository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Content not found"));
    }

    public Parcel save(Transaction transaction){
        return repository.save(transaction);
    }

    public boolean existsById(Integer id) {
        return repository.existsById(id);
    }

    public void delete(@PathVariable Integer id) {
        repository.delete(findById(id));
    }
}
