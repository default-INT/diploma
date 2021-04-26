package by.gstu.itp.palletprod.controller.api;

import by.gstu.itp.palletprod.dto.storage.StorageDto;
import by.gstu.itp.palletprod.dto.storage.StorageItemDto;
import by.gstu.itp.palletprod.exception.NotFoundStorageWriteException;
import by.gstu.itp.palletprod.service.StorageService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/storage")
public class StorageRestController {
    private final StorageService storageService;

    public StorageRestController(StorageService storageService) {
        this.storageService = storageService;
    }

    @GetMapping("/actual")
    public ResponseEntity<?> getActualStore() {
        try {
            return ResponseEntity.ok(storageService.getActualStorageData());
        } catch (NotFoundStorageWriteException e) {
            return ResponseEntity.ok("Storage is empty");
        }
    }

    @DeleteMapping("/delete-items")
    public StorageDto deleteStorageItems(@RequestBody List<StorageItemDto> storageItems) {
        return storageService.deleteItem(storageItems);
    }
}
